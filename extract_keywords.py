import re
import json
import os

def extract_keywords(file_path):
    keywords = {}
    
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
        
    # Process lines 270 to 880 (approximate range based on user input)
    # Adjust index for 0-based array
    target_lines = lines[269:880]
    
    last_processed_ids = []
    
    # Regex to match "// 1 - description" or "// 97,98 - description"
    pattern = re.compile(r'//\s*((?:\d+(?:,\d+)*))\s*-\s*(.*)')
    
    # Regex for continuation lines "// (description)" or "// description"
    continuation_pattern = re.compile(r'//\s+(?!\d+\s*-)(.*)')

    for line in target_lines:
        line = line.strip()
        if not line.startswith('//'):
            continue
            
        match = pattern.match(line)
        if match:
            ids_str = match.group(1)
            desc = match.group(2).strip()
            
            # Split ids by comma
            ids = [int(x.strip()) for x in ids_str.split(',')]
            
            for keyword_id in ids:
                keywords[keyword_id] = desc
                
            last_processed_ids = ids
            
        elif last_processed_ids:
            # Check for continuation
            cont_match = continuation_pattern.match(line)
            if cont_match:
                extra_desc = cont_match.group(1).strip()
                if extra_desc:
                    for kid in last_processed_ids:
                        if kid in keywords:
                             # Add space if not empty
                            if keywords[kid]:
                                keywords[kid] += " " + extra_desc
                            else:
                                keywords[kid] = extra_desc

    # Convert to list of objects
    keyword_list = []
    for kid in sorted(keywords.keys()):
        keyword_list.append({
            "id": kid,
            "name": keywords[kid] if keywords[kid] else f"Keyword {kid}",
            "description": keywords[kid]
        })
        
    return keyword_list

def save_keywords(keywords, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("window.GAME_DATA_KEYWORDS = ")
        json.dump(keywords, f, indent=2, ensure_ascii=False)
        f.write(";")
        
if __name__ == "__main__":
    game_php_path = "webgame/game.php"
    output_js_path = "webgamenew/data/keywords.js"
    
    data = extract_keywords(game_php_path)
    save_keywords(data, output_js_path)
    print(f"Extracted {len(data)} keywords.")
