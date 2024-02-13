프로그래머스 클라우딩 어플리케이션 엔지니어링 데브코스  

React 페이지 라우팅 - React Router 기본 실습
=   
참조 사이트   

마크다운 : <https://gist.github.com/ihoneymon/652be052a0727ad59601>   
React Router : <https://reactrouter.com/en/main>   
React : <https://ko.legacy.reactjs.org>   


감정 일기장 만들기
-
새로운 싱글 페이지 앱,라우터 라이브러리 설치    
<pre>
npx create-react-app emotion-diary
npm install react-router-dom@6
</pre>

dom@6에 @표시는 버전을 명시해주기 위해 사용

실습 중 사용 되지 않을 각종 파일들을 삭제 하고 컴포넌트 pages 생성 ```Diary.js, Edit.js, Home.js, New.js```

페이지를 경로에따라 매핑을 해서 페이지 라우팅 구현
-
```javaScript

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h2>App.js</h2>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />}/>
        <Route path='/Edit' element={<Edit />}/>
        <Route path='/Diary' element={<Diary />}/>
      </Routes>
      <RouteTest />
    </div>
    </BrowserRouter>
  );
}
```

```javaScript
//RouteTest

import { Link } from "react-router-dom";

const RouteTest = () =>{
  return <>
    <Link to={'/'}> Home </Link>
    <br/>
    <Link to={'/Diary'}>Diary</Link>
    <br/>
    <Link to={'/New'}>New</Link>
    <br/>
    <Link to={'/Edit'}>Edit</Link>
  </>
}

export default RouteTest;
 ```

 React Router 를 사용하여 클라이언트 사이드 렌더링(Client-Side Rendering, CSR)을 구현.

 리액트 SPA(Single Page Application) :    
 페이지 간 전환 시에 전체 페이지가 다시 로드 되지 않고, 필요한 데이터만을 받아와 동적으로 화면 갱신.

 클라이언트 사이드 렌더링 CSR(Client-Side Rendering) :    
 서버는 초기에 필요한 HTML과 기본적인 리소스를 전달하고,클라이언트에서 자바스크립트를 사용해 추가적인 데이터를 비동기적으로 불러와 렌더링합니다. 검색 엔진 최적화를 위해 서버 사이드 렌더링(SSR)과 함께 사용될 수 있습니다.