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
  <button onclick={() => navigate(-1)}> 뒤로가기 -1 </button>
  <button onclick={() => navigate("..")}> 뒤로가기.. </button>
  
)
```
useNavigate라는 훅(Hook)은 페이지를 이동시킬수 있는 함수를 반환을 해주는데 그 함수를 navigate로 받은 다음 매개변수를 호출해서 경로를 옮겨줄수 있습니다.    
예) 로그인을 안했다면 로그인을 하라는 페이지로 강제로 보내버린다.
링크 태그를 클릭 안했을 경우에도 의도적으로 페이지를 바꿔버릴수 있습니다.

navigate로 받은 매개변수에 -1를 사용 하면 뒤로가는 기능을 만들수 있다고 합니다.   
경로라서 문자열만 사용이 가능하지 않나? 라는 생각이 들어서 찾아보니 웹 브라우저에서는 사용자가 방문한 웹페이지들의 정보를 '히스토리 스택'이라는 곳에 저장을해서 순서대로 쌓여진다고 합니다. 즉 히스토리 스택에서 들어가고 싶은 델타를 전달 하라고 하는데 여기서 델타는 웹 페이지의 이동에 대한 명령이라고 합니다.    
참조 : <https://reactrouter.com/en/main/hooks/use-navigate>    

그렇다면 터미널에서 이전 폴더로 옮길때 사용하던 '..'을 사용해도 적용이 될지 궁금해서 사용해 봤는데 당연 하게도 navigate가 정상적으로 작동하는걸 확인 할수 있었습니다. 

2024.02.15~16
-
페이지 구현 - 홈, 일기 쓰기 , 일기 수정

다이어리 에디터 DiaryEditor 컴포넌트를 작성하여 페이지의 일기 쓰기, 일기 수정 기능을 구현.    
이부분이 되게 재밌는(?) 부분 이였습니다. 이미지가 클릭되면 isSelected 값이 true 라면 클릭한 EmotionItem 의 className과 emotion_id를 실행하고 실시간으로 css를 바꿔주는 기능이 재밌는 부분이였습니다.   


```javaScript
const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {
  return (
    <div onClick={() => onClick(emotion_id)}
    className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}`: `EmotionItem_off`,].join(" ")}>
      <img src={emotion_img}/>
      <span>{emotion_descript}</span>
    </div>
  )
}

export default EmotionItem;
```

handleSubmit 새 일기를 작성하고  작성완료 버튼을 클릭 했을 경우 실행되는 함수인데 일기를 작성한 후 일기 data에 작성한 data를 추가 해줘야 하기 때문에 App.js 컴포넌트에 있는 onCreate 함수를 실행해 줘야 합니다.

이런 onCreate dispatch 함수들은 이전에 DispatchContext.proider 프로 바이더로 전체 컴포넌트 트리를 감싸줬었습니다.이로써 useContext() 훅을 사용하여  dispatchContext을 통해 onCreate 호출을 해주고 onCreate 안에 있는 date,content,emotion 값을 전달 할수 있었습니다.   


Routes 및 Components: ( 쉬운 예시 )
```javaScript
<Routes> 컴포넌트 내부에는 여러 <Route> 컴포넌트가 있으며 각각이 다른 페이지 (<Home />, <New />, <Edit />, <Diary />)를 나타냅니다.
이러한 컴포넌트들은 DiaryStateContext.Provider 및 DiaryDispatchContext.Provider에서 제공된 컨텍스트 값을 useContext 훅을 사용하여 액세스할 수 있습니다.
```


```javaScript
  const {onCreate} = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if(content.length < 1){
      contentRef.current.focus();
      return;
    }else {
      onCreate(date,content,emotion)
      navigate('/',{replace: true})
    }
  }
```

dummayData를 빈 배열로 바꾼후 localStorage로 newState를 관리 하게 마치 데이터베이스가 있는것 처럼 코드를 수정 해주었다. 하지만 강의에서 알려준대로 코드를 작성해보았지만 id값을 못찾는 에러가 발생하였다.
```javaScript
  function App(){

  const [data,dispatch] = useReducer(reducer,[]);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({type:"INIT",data: diaryList});
    }
  },[]);
```

아마 dataId 를 diaryList 에서 가장 높은 id를 사용하여 초기화 하려고 시도하고 있지만, 작업의 순서 때문에 문제가 발생한거 같아 아래와 같이 수정을 시켜주었다. localData 가있는지 확인하는 if문 안에 dataId.current 할당을 이동 시키고 또한 diaryList 가 비어 있지 않은지 확인하고 첫 번째 요소에 접근하기 전에 확인을 시켜 주었다 다행히 의도한 대로 작동이 되었다.
```javaScript
const [data,dispatch] = useReducer(reducer,[]);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if(localData){
      const diaryList = JSON.parse(localData)
      if(diaryList.length > 0){
        diaryList.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        dataId.current = parseInt(diaryList[0].id) + 1;
      }

      dispatch({type:"INIT",data: diaryList});
    }
  },[]);

```

자잘한 오류 해결을 하고 아래를 통해 serve 패키지를 설치한 후에 빌드를 준비해줬다.
```
npm install -g serve
```
 빌드 작업을 해주고 더이상 오류가 있는지 없는지 재확인을 걸쳐
이번 프로젝트의 막바지가 다가왔다.
```
serve -s build
```


