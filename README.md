# Quotation Backend Clean Code

---

지금 Kotlin + Spring으로 만들고 있는 Quotation Backend Architecture 를 그대로 가져와 Nestjs로 구현하고자 합니다.

해당 구현을 하는 이유는 해당 프로젝트는 Hexagonal Architecture 로 구현하고 있어서 이를 Nestjs 로 비슷하되 리팩토링을 가미해서 CleanCode를 작성하는 방식으로 구현해보면 좋겠다는 생각이 들었습니다.

[실제 팀 프로젝트로 구현하고 있는 Quotation](https://github.com/wisoft-graduate/quotation-api-server)

<br>
<br>

해당 구현은 프로젝트 속도에 맞춰서 진행하고, 스프린트도 그대로 맞춰 진행할 예정입니다.

구현 과정에서 느낀점도, README와 Blog에 기록할 예정입니다. :)

<br>
<br>
<br>

---
### 4/22 Create user api 구현 및 프로젝트 설정
Project를 설계하고 간단하게 User 생성 API를 만들어두었습니다.

주요 버전과 설정은 다음과 같습니다.

node: 20.12.2(LTS)
pnpm: 9.0.2
lint: eslint 개별설정 + prettier 사용 X
IDE: webstorm
test framework: jest
orm: prisma
db: postgres

^_^...

API 문서, 요구사항은 이미 정해져 있고, 작업 순서는 아직 정하지 않았습니다. 순차적으로 계획을 세워 작업할 예정입니다.

<br>
<br>
<br>

