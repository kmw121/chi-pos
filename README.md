# :heart:  chi-pos
개발자 취업 준비생들을 위한 스터디 및 프로젝트 구인 사이트  
주소 : http://chi-pos.com/

# 제작기간
2022년 12월 14일 ~ 
리팩토링 중

# 사용기술  
- **back-end**   
  * Java 11
  * Spring Boot
  * Spring Security
  * Spring Data JPA
  * MariaDB
  * JWT
  * AWS
  * Amazon RDS
- **front-end**

# ERD 설계

![chiposErd](https://user-images.githubusercontent.com/115692844/214377636-b50e6372-e448-4a21-9498-9e76e652c313.png)

# 핵심 기능

- **회원가입**

  - 닉네임 중복 및 아이디 중복 확인 기능 구현.  
  - 서버단에서도 AOP를 통해 유효성검사 처리.  
  - 비밀번호를 받아 서버쪽에서 BCryptPasswordEncoder를 통해 암호화 후 저장.  
  - 프로필 사진을 이미지 파일로 받아 서버에 이름이 중복되지 않도록 UUID+파일이름으로 저장.  
  - 프로필 사진을 등록하지 않을 경우 서버에 nonUrl로 저장 후 기본 이미지 표시.  
  
   &nbsp;  
  ![회원가입](https://user-images.githubusercontent.com/115692844/214416642-e6cbb9cf-7966-4e48-873d-4dc4290f33c0.gif)  
   &nbsp;  
   
- **로그인**
  
  - 아이디와 패스워드를 서버에서 확인후 완료시 로그인 정보를 담은 JWT토큰을 보내 쿠키에 저장.
  - 엑세스 토큰과 리프레시 토큰을 보내 엑세스 토큰의 기한이 만료 될 시 리프레시 토큰으로 새로운 엑세스 토큰 발급.
  - 수령한 엑세스 토큰으로 유저정보를 서버에 요청해 리덕스에 정보를 저장.
  - 프론트에 저장된 유저정보와 게시글,댓글의 유저정보가 같을 경우 수정,마감,삭제 등등의 버튼이 나타나도록 구현.  
  
   &nbsp;  
  ![로그인](https://user-images.githubusercontent.com/115692844/214432870-192feb50-229e-4889-8a4d-a266c74215aa.gif)  
   &nbsp;  
   
- **로그아웃**  
  
  - 쿠키에 저장되어 있던 엑세스 토큰과 리프레시 토큰을 삭제 후 새로고침.  
  
   &nbsp;  
  ![로그아웃](https://user-images.githubusercontent.com/115692844/214470426-fcac92ff-e62f-4a2d-befe-67ff221d1c9e.gif)  
   &nbsp;  
   
- **회원정보변경**
  
  - 기본적인 로직은 회원가입과 동일.
  - SNS로그인이 아닐 경우 기존 비밀번호를 입력하고 기존 비밀번호가 다를 경우 정보 수정 X
  - 프로필 사진을 등록 안 할 경우 기존 프로필 사진으로 유지. 서버에 파일을 새로 저장 후 유저정보의 imageUrl을 변경.  
  
  &nbsp;  
  ![정보변경](https://user-images.githubusercontent.com/115692844/214470757-c5539687-c0b4-412b-b475-081dd4fcc744.gif)  
  &nbsp;  
  
- **SNS로그인**  

  - 구글,카카오 로그인 및 회원가입. 
  - SNS API에 신청해 두었던 ID를 통해 엑세스 토큰을 받고 그 엑세스 토큰으로 유저정보를 요청.
  - 받은 유저정보에서 ID를 추출하여 chi-pos서버의 DataBase와 비교. ID가 존재한다면 로그인, 존재하지 않는 다면 회원가입으로 페이지 이동.
  - 회원가입 페이지는 기존 회원가입 페이지와 동일하나 비밀번호는 적용 X.
  - 회원가입 후 자동으로 로그인.
  
  &nbsp;  
  ![카카오 회원가입](https://user-images.githubusercontent.com/115692844/214440278-d9e7de37-23ad-4d11-822f-710d67fabb21.gif)  
  &nbsp;  
  
- **게시글 등록**  
  - 게시글 정보를 서버의 DataBase에 저장.  
  - 등록 시 로그인 되어있는 유저의 id값도 함께 저장.
  - post요청에 게시글 id가 없을 경우 신규 게시글로 판단하여 insert쿼리 실행.
  ![게시글등록](https://user-images.githubusercontent.com/115692844/214471166-85bfe888-5631-47b3-a7fd-3f87218784e4.gif)

- **게시글 수정**  
  - 로그인 한 유저 정보와 게시글에 저장된 유저정보가 같을 시 수정,삭제,마감 버튼 활성화.  
  - 게시글 등록과 같은 post요청으로 구성.  
  - post요청에 게시글 id가 있을 경우 기존 게시글로 판단하여 update쿼리 실행.  
  
    &nbsp;  
  ![게시글 수정](https://user-images.githubusercontent.com/115692844/214471219-a68bcbed-fe5c-45de-87a3-cc726c5aaffc.gif)  
    &nbsp;  

- **작성한 게시글 조회**  
  - 본 인이 작성한 게시글만 서버에 요청.  
  
  &nbsp;  
  ![내게시글](https://user-images.githubusercontent.com/115692844/214471245-bb5642bc-21b5-4c77-91d4-013395edf0e5.gif)  
  &nbsp;  

- **게시글 삭제**
  - 로그인 한 유저 정보와 게시글에 저장된 유저정보가 같을 시 수정,삭제,마감 버튼 활성화.  
  - 삭제버튼을 누를 시 연관관계에 매핑되어 있던 모든 데이터 삭제.(스택,댓글)  
  
   &nbsp;  
  ![게시글 삭제](https://user-images.githubusercontent.com/115692844/214509304-0928a5d2-9688-4163-bed4-761cf3d452e5.gif)  
   &nbsp;  
   
   
- **모집 마감**  
  - 로그인 한 유저 정보와 게시글에 저장된 유저정보가 같을 시 수정,삭제,마감 버튼 활성화.  
  - 모집 마감 버튼을 누를 시 게시글 정보의 isEnd가 true로 변경.  
  - 모집이 마감으로 변경시 '모집 중 만 보기' 버튼을 눌렀을 시 표시 X

  &nbsp;  
  ![마감](https://user-images.githubusercontent.com/115692844/214471354-4d01e75d-e44a-4939-aa67-8608415cde2d.gif)  
  &nbsp;  
  
- **댓글**  
  - 댓글 정보를 서버의 DataBase에 저장
  - 등록 시 게시글과 마찬가지로 로그인 되어있는 유저의 id값도 함께 저장.
  - 로그인 한 유저정보와 게시글에 댓글에 저장된 유저정보가 같을 시 삭제 버튼 활성화
  
   &nbsp;    
  ![댓글](https://user-images.githubusercontent.com/115692844/214471299-50340397-13ba-492f-ab7e-cdf38b395732.gif)  
   &nbsp;  

- **스택 필터**  
  - 현재 오류 수정 중(2023/01/25)
   &nbsp; 

- **회원 탈퇴**  
  - 정보 수정페이지에서 회원탈퇴 버튼을 누를 시 회원 정보  전부 delete.  
  - 연관관계에 매핑되어 있는 모든 데이터 삭제(게시글,댓글,스택).  
  
  &nbsp; 
  ![회원탈퇴](https://user-images.githubusercontent.com/115692844/214471388-4ff82695-36ee-4447-8b23-8c96640a8028.gif)  
  &nbsp; 
