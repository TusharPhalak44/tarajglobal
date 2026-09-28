import json
import os
import subprocess

log_file = r'C:\Users\TGS33\.gemini\antigravity-ide\brain\373ec1f1-a282-4f2a-a2eb-cbc908ff2467\.system_generated\logs\transcript_full.jsonl'
target = 'HeroRightAnimation.jsx'
out_file = r'c:\Users\TGS33\Desktop\TGS\tarajglobal\client\src\components\sections\Hero\HeroRightAnimation.jsx'

# We'll just read from git head
os.system('git checkout ' + out_file)

with open(out_file, 'r', encoding='utf-8') as f:
    content = f.read()

with open(log_file, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
        except: continue
        
        # Check tool calls
        if 'tool_calls' in data:
            for call in data['tool_calls']:
                if 'args' in call and 'TargetFile' in call['args'] and target in call['args']['TargetFile']:
                    if call['name'] == 'replace_file_content':
                        tc = call['args']['TargetContent']
                        rc = call['args']['ReplacementContent']
                        if tc in content:
                            content = content.replace(tc, rc)
                        else:
                            # Normalize line endings
                            tc = tc.replace('\r\n', '\n')
                            content_norm = content.replace('\r\n', '\n')
                            if tc in content_norm:
                                content_norm = content_norm.replace(tc, rc.replace('\r\n', '\n'))
                                content = content_norm
                    elif call['name'] == 'multi_replace_file_content':
                        for chunk in call['args']['ReplacementChunks']:
                            tc = chunk['TargetContent']
                            rc = chunk['ReplacementContent']
                            if tc in content:
                                content = content.replace(tc, rc)
                            else:
                                tc = tc.replace('\r\n', '\n')
                                content_norm = content.replace('\r\n', '\n')
                                if tc in content_norm:
                                    content_norm = content_norm.replace(tc, rc.replace('\r\n', '\n'))
                                    content = content_norm
        
        # Check user diff blocks
        if 'content' in data and data['content'] and 'The following changes were made by the USER' in data['content'] and target in data['content']:
            diff_text = data['content'].split('[diff_block_start]')[1].split('[diff_block_end]')[0]
            # write to patch file
            with open('patch.diff', 'w', encoding='utf-8') as pf:
                pf.write('--- a/client/src/components/sections/Hero/HeroRightAnimation.jsx\n')
                pf.write('+++ b/client/src/components/sections/Hero/HeroRightAnimation.jsx\n')
                pf.write(diff_text.strip() + '\n')
            
            with open(out_file, 'w', encoding='utf-8') as of:
                of.write(content)
            
            os.system('git apply patch.diff')
            
            with open(out_file, 'r', encoding='utf-8') as of:
                content = of.read()

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(content)
