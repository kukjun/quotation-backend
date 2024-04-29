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

---
### 4/24 ExceptionFilter 구현

코프링 프로젝트를 진행하면서 나온 Error 형태에 맞게 Nestjs로도 동일한 Error구조를 가지도록 변경해서 작업했습니다.
Http 예외를 먼저 만들고, 하위 예외들이 상속받는 형태로 작업함을 통해서, Message가 보다 효과적으로 보일 수 있도록 작업했습니다.

<br>
<br>
<br>

---
### 4/25 Create User API 구현

Create User API에 대해서 구현을 진행하고자 합니다.
이전에 CreateUser API는 Password가 암호화되어있지 않았고, 예외처리가 없었으로 해당 부분을 개선할 예정입니다.

<br>
<br>
<br>

---
### 4/25 Test 환경 구축

현재 API 동작 여부를 테스트할 수 없는 상황이므로, 해당 API 요청과 동작을 확인할 수 있도록 테스트 환경을 구축하겠습니다.
Test는 API당 1개 이상의 통합 테스트를 필수적으로 만들고, 단위 테스트는 비지니스 로직과 도메인 로직에서 필요하면 작성하겠습니다.

통합테스트 실시는 Test Container를 도입해 작업하도록 하겠습니다.

<br>
<br>
<br>

---
### 4/26 Login API 구현

User Login API에 대해서 구현을 진행하고자 합니다.
이전에 Test 환경을 구축했으므로, 해당 API 구현 후 테스트도 진행하도록 하겠습니다.

<br>
<br>
<br>

---
### 4/29 Update User API 구현

User Update API를 구현하고자 합니다.
토큰을 활용해서 인가처리하는 부분은 추후에 적용하고자 합니다. 토큰 인가 활용은 데코레이터를 사용해서 처리하겠습니다.

Update User API와 이를 테스트하는 테스트코드까지 함께 작업해두도록 하겠습니다.


