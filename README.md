# Team WhiteSpace

## 🖥 프로젝트 소개

React를 사용한 '공백' 웹사이트 클론

## 📅 프로젝트 기간

2021.04.12 ~ 2021.04.23

## 🎥 프로젝트 시연영상

https://vimeo.com/540894798

## 👩🏻‍💻🧑🏻‍💻 프로젝트 참가자 (Front & Back)

🔜 FrontEnd

- 김남선, 김동현, 박단비

🔙 BackEnd

- 문희원, 홍태경

## 🔧 기술 스택

- FrontEnd

  ![HTML/CSS](https://img.shields.io/badge/-HTML/CSS-E44D26)  
  ![SASS](https://img.shields.io/badge/-SCSS-ff69b4)  
  ![JavaScript(ES6+)](<https://img.shields.io/badge/-JavaScript(ES6%2B)-F0DB4D>)  
  ![React](https://img.shields.io/badge/-React-blue)

- BackEnd

  ![Python](https://img.shields.io/badge/-Python-376FA0)  
  ![Django](https://img.shields.io/badge/-Django-043829)  
  ![CORS Header](<https://img.shields.io/badge/-CORS Header-F0DB4D>)  
  ![Bcrypt](https://img.shields.io/badge/-Bcrypt-2A334C)  
  ![PyJWT](https://img.shields.io/badge/-PyJWT-black)  
  ![MySQL](https://img.shields.io/badge/-MySQL-DD8A00)  
  ![AqeuryTool](https://img.shields.io/badge/-AqeuryTool-6A9CA7)  
  ![S3](https://img.shields.io/badge/-S3-DA5041)

- 협업 도구

  ![Slack](https://img.shields.io/badge/-Slack-D91D57)  
  ![Git](https://img.shields.io/badge/-Git-black)  
  ![Trello](https://img.shields.io/badge/-Trello-036AA7)

---

# ⭐️ 구현한 기능

## 🌱 Frontend

### 회원가입 & 로그인

- 회원 가입시 아이디, 비밀번호 유효성 검사
- 회원 가입시 아이디, 휴대폰번호 중복 검사

### 네비게이션 바

- 팝업 슬라이드 구현
- 로그인 토큰 유무에 따라 메뉴가 바뀌도록 구현

### 메인 페이지

- 슬라이드를 이용한 이미지배너 구현
- top 버튼 구현
- 로그인 토큰 유무에 따른 회원가입 유도 팝업창 구현

### 상품리스트 페이지

- 각각의 상품을 컴포넌트 화
- 상품이 출시된지 하루 이내일 경우 `NEW` 뱃지, 각 상품의 재고량이 없을 시, `LIMITED` 뱃지, 재고량이 없을 경우 `SOLDOUT` 뱃지가 나오도록 구현
- 페이지네이션 기능 구현
- 검색 기능 구현, 검색 결과가 없을 시 검색결과가 없습니다 표시

### 상품 상세페이지

- 상품 정보 컴포넌트화
- 컬러, 옵션에 따른 가격 변동 기능 구현
- formData를 활용한 multiple 이미지 업로드 기능 구현
- 리뷰 클릭 시 모달로 상세 리뷰 확인 기능

### 장바구니 페이지

- 장바구니 상품 추가 기능
- 장바구니 선택 삭제 기능
- 장바구니 비우기 기능
- 수량 옵션 변경시 Database에 실시간 반영

### 결제 페이지

- 각 테이블을 컴포넌트 화
- 다음 주소 API를 활용한 주소 입력 기능

---

## 🌱 Backend

### 모델링 구축

### 회원가입 & 로그인

- bcrypt를 사용한 암호화
- JWT 로그인 구현 및 @decorator를 이용해서 토큰 인증
- Email&닉네임 정규화를 통한 Validation적용

### 네비게이션 바

### 메인 페이지

### 상품리스트 페이지

### 상품 상세페이지

- 상품 상세 페이지 (상품 정보: 가격, 사진, 옵션 )

### 장바구니 페이지

- 장바구니 내역 조회
- 상품의 장바구니 등록 (개수 포함)
- 장바구니 상품 수량 변경 및 가격반영(DB에 전부 반영되도록 설정)

---

# 👥 후기

## 🔜 Frontend

김남선  
김동현  
박단비

## 🔙 Backend

문희원  
홍태경

---

# ❗️ 레퍼런스

이 프로젝트는 공백 웹사이트를 참조하여 학습목적으로 만들었습니다.
실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
