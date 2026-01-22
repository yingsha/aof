import re
import json

def clean_php_string(s):
    # Handle PHP string concatenation with variables like .$baseurl.
    # Replace .$baseurl. or ".$baseurl." with empty string (or rather, just remove the variable part)
    # The actual baseurl replacement logic will happen on the content string
    
    # First, handle escaped quotes
    # PHP: "text \"quote\" text" -> Python raw: text "quote" text
    
    # Remove PHP concatenation syntax: " . $var . "
    # We specifically target $baseurl
    s = s.replace('".$baseurl."', 'https://aof.guzh.me/')
    s = s.replace("'.$baseurl.'", 'https://aof.guzh.me/')
    s = s.replace('$baseurl.', 'https://aof.guzh.me/')
    s = s.replace('.$baseurl', 'https://aof.guzh.me/')
    
    # Handle other concatenations if any, simple approach: remove " . " or ' . '
    # But this is risky if text contains it.
    # For this specific file, mostly baseurl is used.
    
    # Handle escaped quotes
    s = s.replace('\\"', '"').replace("\\'", "'")
    
    # Handle images path
    s = s.replace('images/misc/', 'https://aof.guzh.me/images/misc/')
    
    # Handle illuminated caps like <img ... alt="Y">
    match = re.match(r'^<img[^>]*alt=["\']([a-zA-Z])["\'][^>]*>', s)
    if match:
        letter = match.group(1)
        s = letter + s[match.end():]
    
    return s

def parse_php_value(val):
    val = val.strip()
    
    # Check if it's a string
    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
        # Remove surrounding quotes
        val = val[1:-1]
        return clean_php_string(val)
        
    if val.isdigit() or (val.startswith('-') and val[1:].isdigit()):
        return int(val)
        
    if val == "no text":
        return ""
        
    # Check if it's a concatenated string expression (e.g. "text".$var)
    if '"' in val or "'" in val:
        # It's a complex string expression, try to clean it
        # Remove surrounding quotes if they exist (tricky for concatenated)
        # Just clean it directly
        # Example: "<img src=\"".$baseurl."images/..."
        # This whole thing is passed as `val`
        
        # We need to strip the outer quotes of the PHP expression?
        # The regex extractor extracted the WHOLE value expression.
        
        # If the value starts with " and ends with ", simple case.
        # If it looks like: "start" . $var . "end", we need to merge.
        
        # Simple heuristic for this specific codebase:
        # Remove leading/trailing quotes if present
        if val.startswith('"'): val = val[1:]
        if val.endswith('"'): val = val[:-1]
        
        return clean_php_string(val)

    return val

def process_event(evt):
    type_id = evt['type']
    args = evt['raw_args']
    options = []
    logic = {}

    # Default option text key
    default_opt_text = "Loc_Continue"

    if type_id == 0: # End
        pass
        
    elif type_id == 1: # Single Link
        if len(args) >= 1:
            logic = {
                "type": "single_link",
                "next": str(args[0])
            }
            # No options needed for single link, handled by logic and auto-advance

    elif type_id == 2: # Free Choice
        # args[0] is count
        # then text, target pairs
        if len(args) > 0:
            count = args[0]
            choices = []
            idx = 1
            for _ in range(count):
                if idx + 1 < len(args):
                    txt = args[idx]
                    target = args[idx+1]
                    choices.append({
                        "text": str(txt), # Might be a key
                        "text_key": str(txt) if str(txt).startswith("Loc_") else None,
                        "next_event": str(target)
                    })
                    idx += 2
            logic = {
                "type": "free_choice",
                "count": count,
                "choices": choices
            }
        # No options needed in the event itself, options will be rendered by UI based on logic

    elif type_id == 3: # Saving Roll
        # attr, diff, success, fail
        if len(args) >= 4:
            logic = {
                "type": "check",
                "attr": args[0],
                "diff": args[1],
                "pass": str(args[2]),
                "fail": str(args[3])
            }
            # We add a dummy option to trigger the check
            options.append({
                "text_zh": "掷骰检定",
                "text_key": "Loc_RollDice",
                "action": "check"
            })

    elif type_id == 4: # Random Branching
        # count, target1, target2...
        if len(args) >= 1:
            count = args[0]
            targets = [str(t) for t in args[1:1+count]]
            logic = {
                "type": "random",
                "targets": targets
            }
            options.append({ "text_zh": "...", "action": "random" })

    elif type_id == 5: # Item Check
        # item_id, have, dont_have
        if len(args) >= 3:
            logic = {
                "type": "item_check",
                "item_id": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })
            
    elif type_id == 6: # Keyword Check
        # keyword_id, have, dont_have
        if len(args) >= 3:
            logic = {
                "type": "keyword_check",
                "keyword_id": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 7: # Gain/Lose Item
        # item_id, 0/1 (lose/gain), next
        if len(args) >= 3:
            logic = {
                "type": "effect",
                "item_op": "add" if args[1] == 1 else "remove",
                "item_id": args[0],
                "next": str(args[2])
            }
            # No options needed for effect events, handled by logic and auto-advance

    elif type_id == 8: # Gain/Lose Keyword
        # keyword_id, 0/1, next
        if len(args) >= 3:
            logic = {
                "type": "effect",
                "keyword_op": "add" if args[1] == 1 else "remove",
                "keyword_id": args[0],
                "next": str(args[2])
            }
            # No options needed for effect events, handled by logic and auto-advance

    elif type_id == 9: # Stat Change
        # attr, change, next
        if len(args) >= 3:
            logic = {
                "type": "effect",
                "stat_attr": args[0],
                "stat_val": args[1],
                "next": str(args[2])
            }
            # No options needed for effect events, handled by logic and auto-advance

    elif type_id == 10: # Shells Change
        # amount, next
        if len(args) >= 2:
            logic = {
                "type": "effect",
                "money_val": args[0],
                "next": str(args[1])
            }
            # No options needed for effect events, handled by logic and auto-advance

    elif type_id == 11: # Shells Check
        # min, pass, fail
        if len(args) >= 3:
            logic = {
                "type": "money_check",
                "amount": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 12: # Multi-Attr Check
        # count, diff, attrs..., dests...
        if len(args) >= 2:
            try:
                count = int(args[0])
                diff = int(args[1])
            except ValueError:
                count = 0
                diff = 0
                
            # args[2] to args[2+count] are attrs (slice end is exclusive)
            # count=2, args[2], args[3]. slice [2:4]
            attrs = [str(x) for x in args[2:2+count]]
            
            # args[2+count] to args[2+2*count+1] (slice end exclusive)
            # count=2, dests needed: 3. args[4], args[5], args[6].
            # slice [4:7]
            dests = [str(x) for x in args[2+count:2+2*count+1]]
            
            logic = {
                "type": "multi_check",
                "count": count,
                "diff": diff,
                "attrs": attrs,
                "dests": dests
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 13: # Click to Continue
        # next
        if len(args) >= 1:
            logic = {
                "type": "click_continue",
                "next": str(args[0])
            }
            # No options needed, as the UI will render a continue button based on logic

    elif type_id == 14: # Gain Blessing
        # blessing_name, next
        if len(args) >= 2:
            logic = {
                "type": "gain_blessing",
                "blessing": args[0],
                "next": str(args[1])
            }
            # No options needed for effect events, handled by logic and auto-advance

    elif type_id == 15: # Blessing Check
        # blessing_name, pass, fail
        if len(args) >= 3:
            logic = {
                "type": "blessing_check",
                "blessing": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })
            
    elif type_id == 16: # Profession Check
        # prof_id, pass, fail
        if len(args) >= 3:
            logic = {
                "type": "prof_check",
                "prof_id": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 17: # Conditional Choice
        # Type 17: Free choice with conditions
        # Slot 0: count (max number of choices)
        # Then for each choice: text, condition_number, destination
        # Condition encoding:
        #   0 = always show
        #   1-999 = requires keyword with that ID
        #   1000+ = requires NOT having keyword (value - 1000 = keyword ID)
        #   -1 to -99 = requires item (abs value = item ID)
        #   -100 or less = requires NOT having item (abs value - 100 = item ID)
        if len(args) >= 1:
            count = args[0] if isinstance(args[0], int) else 0
            choices = []
            idx = 1
            for _ in range(count):
                if idx + 2 < len(args):
                    text = str(args[idx])
                    cond = args[idx + 1] if isinstance(args[idx + 1], int) else 0
                    dest = str(args[idx + 2])
                    
                    # Parse condition
                    cond_type = "always"  # default
                    cond_id = 0
                    if cond == 0:
                        cond_type = "always"
                    elif cond >= 1000:
                        cond_type = "no_keyword"
                        cond_id = cond - 1000
                    elif cond > 0:
                        cond_type = "has_keyword"
                        cond_id = cond
                    elif cond <= -100:
                        cond_type = "no_item"
                        cond_id = abs(cond) - 100
                    elif cond < 0:
                        cond_type = "has_item"
                        cond_id = abs(cond)
                    
                    choice = {
                        "text": text,
                        "text_key": text if text.startswith("Loc_") else None,
                        "condition_type": cond_type,
                        "condition_id": cond_id,
                        "condition_raw": cond,  # Keep raw value for reference
                        "next_event": dest
                    }
                    choices.append(choice)
                    
                    # Also add to options array for game display
                    options.append({
                        "text_zh": text,
                        "text_key": text if text.startswith("Loc_") else None,
                        "condition_type": cond_type,
                        "condition_id": cond_id,
                        "next_event": dest
                    })
                    
                    idx += 3
            
            logic = {
                "type": "conditional_choice",
                "count": count,
                "choices": choices
            }

    elif type_id == 18: # Lose all companions
        # slot 2 = destination.
        if len(args) >= 1:
            logic = {
                "type": "lose_companions",
                "next": str(args[0])
            }
            # No options for lose companions, handled by logic and auto-advance

    elif type_id == 20: # Level Check
        # level, pass, fail
        if len(args) >= 3:
            logic = {
                "type": "level_check",
                "level": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 21: # Stat Swap
        # target_attr, source_attr, next
        if len(args) >= 3:
            logic = {
                "type": "stat_swap",
                "target_attr": args[0],
                "source_attr": args[1],
                "next": str(args[2])
            }
            # No options for stat swap, handled by logic and auto-advance

    elif type_id == 22: # Shell Random Check (1-99)
        # slot 2 empty, pass, fail
        if len(args) >= 3:
            logic = {
                "type": "random_money_check",
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            # No options for random money check


    elif type_id == 19: # Not Implemented Message
        # No arguments, it's just a placeholder message.
        # This type doesn't have a next event from args, so we can make one that goes to an 'empty' state or a special debug event.
        logic = {
            "type": "not_implemented",
            "next": "0" # Default to 0 for fallback
        }

    elif type_id == 20: # Level Check
        # slot 2 is a level
        # slot 3 is destination if you're at least that level
        # slot 4 is destination if not.
        if len(args) >= 3:
            logic = {
                "type": "level_check",
                "level": args[0],
                "pass": str(args[1]),
                "fail": str(args[2])
            }
            options.append({ "text_zh": "...", "action": "check" })

    elif type_id == 21: # Stat Swap
        # special: change attribute named in slot 2 to equal attribute named in slot 3
        # destination is slot 4
        # attr1_name, attr2_name, next
        if len(args) >= 3:
            logic = {
                "type": "stat_swap",
                "attr1": args[0],
                "attr2": args[1],
                "next": str(args[2])
            }
            # No options for stat swap


    elif type_id == 23: # Random Profession Change
        # slot 2 is destination
        if len(args) >= 1:
            logic = {
                "type": "random_prof_change",
                "next": str(args[0])
            }
            # No options for random prof change

    elif type_id == 24: # Change Profession to Clown (0)
        # slot 2 is destination
        if len(args) >= 1:
            logic = {
                "type": "set_prof_clown",
                "next": str(args[0])
            }
            # No options for set prof clown

    elif type_id == 25: # Winning End
        # Same as type 0, but implies a win state and shows attributes.
        # No specific args for logic, will just be an end state.
        # We can add a flag to the event to indicate winning for frontend.
        logic = {
            "type": "winning_end"
        }

    # Generic Fallback for unhandled types or missing args
    if not options and not logic and type_id != 0:
        # If we have args, assume first arg is next event (common fallback)
        if args:
            options.append({
                "text_zh": "DEBUG: Continue",
                "next_event": str(args[0])
            })

    evt['options'] = options
    if logic:
        evt['logic'] = logic
    
    del evt['raw_args'] # Cleanup
    return evt

def main():
    with open('webgame/game.php', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find start of $paras
    start_marker = '$paras=array ('
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Could not find $paras start")
        return

    # Step 0: Map keys to line numbers using the ORIGINAL content
    key_line_map = {}
    # Regex to find "Key" => array
    # We search in the whole content or just after start_idx?
    # Better search whole content or just the array part to avoid false positives?
    # The array part is safest.
    paras_content = content[start_idx:]
    base_line = content.count('\n', 0, start_idx) + 1
    paras_lines = paras_content.split('\n')
    
    key_pattern = re.compile(r"(['\"]?[\w\d]+['\"]?)\s*=>\s*array")
    for m in key_pattern.finditer(paras_content):
        key_raw = m.group(1)
        # Parse key to match later usage (remove quotes etc)
        key_parsed = str(parse_php_value(key_raw))
        
        lines_before = paras_content.count('\n', 0, m.start())
        line_num = base_line + lines_before
        
        code_content = paras_lines[lines_before].strip() if lines_before < len(paras_lines) else ""
        
        key_line_map[key_parsed] = {
            'line': line_num,
            'code': code_content
        }

    lines = content[start_idx:].split('\n')
    
    clean_lines = []
    for line in lines:
        line = line.strip()
        if line.startswith('//'):
            continue
        if '//' in line:
            line = line.split('//')[0].strip()
        clean_lines.append(line)
        
    full_str = "".join(clean_lines)
    
    # Pre-process content to merge PHP string concatenations
    # Step 1: Replace variable concatenations specific to this game
    full_str = full_str.replace('".$baseurl."', 'https://aof.guzh.me/')
    full_str = full_str.replace("'.$baseurl.'", 'https://aof.guzh.me/')
    # Also handle non-quoted concatenation if any (less likely in array defs but possible)
    
    # Step 2: Merge "string" . "string" patterns
    # We replace " . " or "." between quotes with nothing.
    # Pattern: " \. " -> ""
    # Pattern: ' \. ' -> ''
    full_str = re.sub(r'"\s*\.\s*"', '', full_str)
    full_str = re.sub(r"'\s*\.\s*'", '', full_str)
    
    # Improved regex to handle keys (numbers or strings)
    # matches key => array( ... ),
    matches = re.findall(r"(['\"]?[\w\d]+['\"]?)\s*=>\s*array\s*\((.*?)\),", full_str)
    
    events_dict = {}
    
    for key, content in matches:
        key = parse_php_value(key)
        
        args = []
        # Arg pattern: matches "string" (with escaped quotes) or 'string' or number/identifier
        # We need to be careful about strings containing commas
        # The content inside array(...) is comma separated arguments.
        # But some arguments are strings that might contain commas.
        
        # Regex explanation:
        # Group 1: Double quoted string: "..." - handles escaped quotes
        # Group 2: Single quoted string: '...'
        # Group 3: Unquoted value (number, variable, etc): [^\s,]+
        arg_pattern = re.compile(r'(?: "((?:[^"\\]|\\.)*)" | \'((?:[^\'\\]|\\.)*)\' | ([^\s,]+) )', re.VERBOSE)
        
        for m in arg_pattern.finditer(content):
            if m.group(1) is not None: 
                # Found double quoted string
                val = m.group(1)
                # We need to manually clean it because parse_php_value expects raw quoted string sometimes
                # But here we already stripped quotes.
                # Let's apply clean_php_string logic manually
                val = clean_php_string(val)
                args.append(val)
            elif m.group(2) is not None: 
                # Found single quoted string
                val = m.group(2)
                val = clean_php_string(val)
                args.append(val)
            elif m.group(3) is not None: 
                # Unquoted
                val = m.group(3)
                # It might be a number, or "no text" (which is actually a string but sometimes unquoted in loose PHP?)
                # Actually in the file it's likely "no text" as a string.
                # If it's a number:
                if val.lstrip('-').isdigit():
                    args.append(int(val))
                else:
                    # Could be concatenated string without spaces: "Loc_Msg".$step
                    # Our regex [^\s,]+ matched it.
                    # This is hard to parse perfectly without a parser.
                    # For now, treat as string.
                    val = clean_php_string(val)
                    args.append(val)
            
        clean_args = args
                
        if not clean_args: continue
        
        text = clean_args[0] if clean_args[0] != "no text" else ""
        type_id = clean_args[1] if len(clean_args) > 1 and isinstance(clean_args[1], int) else 0
        
        # Lookup line info
        line_info = key_line_map.get(str(key), {'line': 0, 'code': ''})
        source_line = line_info['line']
        source_code = line_info['code']

        event = {
            "id": str(key),
            "source_line": source_line,
            "source_code": source_code,
            "text_zh": text,
            "text_en": "", 
            "type": type_id,
            "raw_args": clean_args[2:]
        }
        
        processed = process_event(event)
        events_dict[processed['id']] = processed
        
    events = list(events_dict.values())
    print(f"Extracted {len(events)} events.")
    
    # Save as JS file directly
    js_content = f"window.GAME_DATA_EVENTS = {json.dumps(events, indent=2, ensure_ascii=False)};"
    with open('webgamenew/data/events.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

if __name__ == "__main__":
    main()
