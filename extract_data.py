import re
import json
import os

def parse_php_array(content, array_name):
    # 查找 $array_name = array ( ... );
    # 注意 game.php 中的 localization 是在函数内部定义的
    # function getLocStr($fulltext, $lang) { ... $localization=array( ... ); }
    
    # 我们用一个更宽泛的正则来查找 $localization = array
    pattern = re.compile(r'\$' + array_name + r'\s*=\s*array\s*\((.*?)\);', re.DOTALL)
    
    # 可能有多个匹配（比如 game.php 和 index.php 都有）
    # 但我们现在的 content 是单文件的。
    # 在 game.php 中，$localization 是局部变量，正则也能匹配到。
    
    match = pattern.search(content)
    if not match:
        return {}
    
    array_content = match.group(1)
    result = {}
    
    lines = array_content.split('\n')
    for line in lines:
        line = line.strip()
        if not line or line.startswith('//'):
            continue
            
        # 匹配 key => value
        # 针对 $class 数组
        if array_name == 'class':
            m = re.match(r'(\d+)=>\s*array\s*\((.*)\),?', line)
            if m:
                key = int(m.group(1))
                val_str = m.group(2)
                # 手动处理 split
                vals = [v.strip().strip('"') for v in val_str.split(',')]
                try:
                    result[key] = {
                        "image": vals[0],
                        "stats": [int(x) for x in vals[1:13]], # 12个属性
                        "name": vals[13],
                        "gender": int(vals[14])
                    }
                except IndexError:
                    print(f"Error parsing line: {line}")
                    continue
        
        # 针对 $localization 数组
        elif array_name == 'localization':
            # key => array("En", "Cn")
            # Key 可能是 'String' 或 "String"
            m = re.match(r'[\'"](.+?)[\'"]\s*=>\s*array\s*\(\s*[\'"](.+?)[\'"]\s*,\s*[\'"](.+?)[\'"]\s*\),?', line)
            if m:
                key = m.group(1)
                en = m.group(2)
                cn = m.group(3)
                result[key] = {"en": en, "zh": cn}
            else:
                # 尝试匹配 "key" => array( "En", "Cn" ) (key 用双引号)
                # 其实上面的正则已经涵盖了。
                # 还有一种情况：key 没有引号？ PHP 数组 key 必须有引号除非是数字或常量。
                pass

    return result

def extract_from_file(filename):
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        return f.read()

def save_js(data, var_name, filename):
    js_content = f'window.{var_name} = {json.dumps(data, indent=2, ensure_ascii=False)};'
    with open(f'webgamenew/data/{filename}', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Saved {filename}")

def main():
    # 1. Classes & Attributes (from index.php)
    index_content = extract_from_file('webgame/index.php')
    
    classes = parse_php_array(index_content, 'class')
    
    # Class Names
    classname_pattern = re.compile(r'\$classname\s*=\s*array\s*\((.*?)\);', re.DOTALL)
    match = classname_pattern.search(index_content)
    class_names = {}
    if match:
        lines = match.group(1).split('\n')
        for line in lines:
            m = re.match(r'(\d+)=>\s*array\s*\("([^"]+)",\s*"([^"]+)"\),?', line.strip())
            if m:
                cid = int(m.group(1))
                full_name = m.group(3)
                class_names[cid] = full_name

    final_classes = []
    for cid, data in classes.items():
        name_entry = class_names.get(cid, "")
        data['id'] = cid
        data['display_name'] = name_entry
        final_classes.append(data)

    save_js(final_classes, 'GAME_DATA_CLASSES', 'classes.js')

    attributes = [
        "Stamina", "Charisma", "Duelling", "Brawling", "Seafaring", "Magic", 
        "Heroism", "Scouting", "Roguery", "Luck", "Healing", "Streetwise"
    ]
    save_js(attributes, 'GAME_DATA_ATTRIBUTES', 'attributes.js')

    # 2. Localization (from BOTH index.php AND game.php)
    loc_index = parse_php_array(index_content, 'localization')
    
    game_content = extract_from_file('webgame/game.php')
    loc_game = parse_php_array(game_content, 'localization')
    
    # Merge: game.php has more specific ones, but index.php has UI ones.
    # We combine them.
    localization = {**loc_index, **loc_game}
    
    print(f"Extracted {len(localization)} localization keys.")
    save_js(localization, 'GAME_DATA_LOCALIZATION', 'localization.js')

if __name__ == "__main__":
    main()
