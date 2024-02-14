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

 2024.02.14
 -
 오늘은 React에서 CSR기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리 React Router 라이브러리에서 몇 가지 훅(Hook)이 있는데, 그 중에서 'useParams', 'useSearchParams', 'useNavigate'에 대해 간단하게 공부해보고자 한다.

 1. useParams : 'useParams' 훅은 현재 라우트에서 동적으로 설정된 매개변수 값을 가져오는 데 사용됩니다. 동적 라우트는 URL 경로에 변수를 포함하고, 이 변수는 컴포넌트에서 'useParams'를 사용하여 접근할 수 있습니다. 예) '/user/:id'와 같은 경로에서 ':id'에 해당하는 값을 가져올 수 있습니다.

```javaScript
function UserProfile(){
  const { id } = useParams();

  return <div> User ID: {id} </div>;
}
```
1. useSearchParams : 'useSearchParams' 훅(Hook)은 현재 URL의 쿼리 매개변수(query parameters)를 가져오는 데 사용됩니다. URL에 '?key=value'와 같은 형태로 전달된 매개변수를 추출하여 사용할 수 있습니다. 예) '/search?q=query'에서 'q'에 해당하는 값을 가져올 수 있습니다.

```javaScript
function SearchResults(){
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  return <div> Search Query: { query } </div>;
}
```

3. useNavigate : 'useNavigate' 훅(Hook)은 프로그래밍 방식으로 라우팅을 제어하기 위해 사용됩니다. 일반적으로 이 훅을 사용하여 버튼 클릭이나 이벤트 핸들러에서 다른 경로로 이동할 수 있습니다. 예를 들어, 특정 버튼 클릭 시 다른 경로로 이동하고 싶을때 사용됩니다.

```javaScript
function NavigationExample() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-route');
  };

  return <button onClick={handleClick}>Go to New Route</button>;
}
```

이러한 훅들을 **'왜'** 사용하냐면 리액트 라우터를 통해 간편하게 **네비게이션을 관리하고 URL관련 정보를 추출하는 데 도움**을 줍니다.

useParams
-

이번 프로젝트에서 '/Diary/:id'를 사용 하는 이유는 'id' 가 없는 diary가 없기 때문에 '/Diary'를 사용하지 않고 예외처리는 안하도록 했다. 쉽게 말해 '/Diary' 경로로 접근할 일이 없다는것입니다.    

```javaScript
import {useParams} from "react-router-dom";

const Diary = () => {
  const {id} = useParams();
  console.log(id); 
  // 입력 localhost:3000/diary/1004  
  // 할당 확인 id = 1004
  return()
}
export default Diary;
```
위 코드와 같이 Diary 컴포넌트에 {id} (PathVariable) 값을 이용해서 전달하고 'useParams()' 같은 리액트 라우터의 커스텀 훅을 꺼내 사용 할수 있다.    
PathVariable 이란? 경로 변수는 중괄호 {id}로 둘러싸인 값을 나타내고 URL 경로에서 변수 값을 추출하여 매개변수에 할당한다. 기본적으로 경로 변수는 반드시 값을 가져야 하며, 값이 없는 경우 404 오류가 발생한다. 주로 상세조회,수정,삭제와 같은 작업에서 리소스 식별자로 사용된다.

useSearchParams
-
Query String은 Path Variable과 유사한 역할을 하는 기법입니다.
```
  /edit?id=10&mode=dark => Query String
```
이런식으로 id = 10 , name = value 'name'과 'value'를 엮어서 데이터를 전송할수 있는 방법을 Query String 이라고 합니다. 웹 페이지에 데이터를 전달하는 가장 간단한 방법이기 때문에 자주 사용 됩니다.    
query string에서 재밋는 부분이 있습니다. 별도의 처리를 안해줘도 자동으로 매핑이 되고 ? 물음표 뒤에 있는 경로들은 페이지 라우팅 경로에 영향을 주지 않습니다.    

useParams 와는 다르게 배열을 반환 하고 첫번째 반환받는 인덱스는 get을 통해서 전달받은 query string들을 꺼내서 사용하는 용도로도 사용이 가능합니다. 
```javaScript
import { useSearchParams } from "react-router-dom";

const Edit = () => {

  const [searchParams,setSearchParams] = useSearchParams();

  const id = searchParams.get('id')
  const mode = searchParams.get('mode')
  console.log("id : ", id)
  console.log("mode : ", mode)
// id : 1990, mode : dark
// localhost:3000/edit?id=1990&mode=dark

  
```
useState와 비슷하게 '[searchParams, setSearchParams]' 비구조화 할당과 setSearchParams와 같은 상태 변환 함수를 통해 searchParams의 값을 바꿔줄수 있습니다.

```javaScript
  return (
  <div>
    <h1>Edit</h1>
    <p>이곳은 일기 수정 페이지 입니다.</p>
    <button onClick={() => setSearchParams({ who: "hyo"})}>
    QS바꾸기
    </button>
  </div>
  );
};
```

useNavigate
-
말그대로 쉽게 Page Moving 기능입니다. 
```javaScript
import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

return(

  <button onclick={() => navigate("/Home")}> home으로 가기 </button>
  <button onclick={() => navigate(-1)}> 뒤로가기 </button>
  
)
```
useNavigate라는 훅(Hook)은 페이지를 이동시킬수 있는 함수를 반환을 해주는데 그 함수를 navigate로 받은 다음 매개변수를 호출해서 경로를 옮겨줄수 있습니다.    
예) 로그인을 안했다면 로그인을 하라는 페이지로 강제로 보내버린다.
링크 태그를 클릭 안했을 경우에도 의도적으로 페이지를 바꿔버릴수 있습니다.