# Please install OpenAI SDK first: `pip3 install openai`
 
from openai import OpenAI

client = OpenAI(
    api_key="sk-9e666ed927064aae990af01f42fabcf3",
    base_url="https://api.deepseek.com")

response = client.chat.completions.create(
    model="deepseek-v4-pro",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "你好，做个自我介绍"},
    ],
    stream=True,
    reasoning_effort="high",
    extra_body={"thinking": {"type": "enabled"}}
)
# ANSI 转义序列：用于终端字体颜色控制
# \033[ 是转义字符的开始，后面跟着颜色代码，m 表示设置属性
# 93m = 亮黄色（用于思考中内容）
# 92m = 亮绿色（用于结果内容）
# 0m  = 重置所有属性（恢复默认颜色）
YELLOW = "\033[93m"
GREEN = "\033[92m"
RESET = "\033[0m"

# 打印前缀，不换行
print("AI:", end="",flush=True)
# 标记变量：用于判断是否已经输出了"思考中"和"结果"的标题
reasoning_content = False
result_content=False

# 遍历流式响应的每一个 chunk
for chunk in response:
    # 如果 chunk 包含思考内容
    if chunk.choices[0].delta.reasoning_content:
        # 如果是第一次收到思考内容，先输出"思考中:"标题
        if not reasoning_content:
            # 使用黄色输出"思考中:"标题，然后重置颜色
            print(f"{YELLOW}思考中:{RESET}", end="",flush=True)
            reasoning_content = True 
        # 使用黄色输出思考内容，每输出一段后重置颜色
        print(f"{YELLOW}{chunk.choices[0].delta.reasoning_content}{RESET}", end="",flush=True)
    # 如果 chunk 包含结果内容
    if chunk.choices[0].delta.content:
        # 如果是第一次收到结果内容，先输出"结果:"标题
        if not result_content: 
            print()
            print()
            print()
            # 使用绿色输出"结果:"标题，然后重置颜色
            print(f"{GREEN}结果:{RESET}", end="",flush=True)
            result_content = True
        
        # 使用绿色输出结果内容，每输出一段后重置颜色
        print(f"{GREEN}{chunk.choices[0].delta.content}{RESET}", end="",flush=True)
        
    # if chunk.choices[0].delta.reasoning_content: 
    #     print(chunk.choices[0].delta.reasoning_content, end="",flush=True)

    # if chunk.choices[0].delta.content: 
    #     print(chunk.choices[0].delta.content, end="",flush=True)