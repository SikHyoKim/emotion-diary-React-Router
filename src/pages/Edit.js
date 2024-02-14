import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();

  const id = searchParams.get('id')
  const mode = searchParams.get('mode')

  console.log("id : ",id);
  console.log("mode : ",mode);

  return (
  <div>
    <h1>Edit</h1>
    <p>이곳은 일기 수정 페이지 입니다.</p>
    <button onClick={() => setSearchParams({ who: "hyo"})}>
    QS바꾸기
    </button>

    <button onClick={() => navigate('/Home')}> 
    Home으로 가기
    </button>
    <button onClick={() => navigate('..')}> 뒤로가기..</button>
    <button onClick={() => navigate(-1)}> 뒤로가기 -1</button>
  </div>
  );
};


export default Edit;