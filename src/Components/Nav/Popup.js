import Carousel from './Component/Carousel';
// import '../../Styles/common.scss';

const App = () => {
  return (
    <div>
      <Carousel>
        {POPUP_DATA.map(popup => (
          <div style={popup.style}>{popup.content}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;

const POPUP_DATA = [
  {
    content: '지금 회원가입시 여백 3천원 할인 쿠폰 발급',
    style: {
      backgroundColor: 'yellow',
      padding: '20px 0',
      textAlign: 'center',
    },
  },
  {
    content: '카카오 플친 추가시 2,000원 할인 쿠폰 지급!',
    style: {
      backgroundColor: 'skyblue',
      padding: '20px 0',
      textAlign: 'center',
    },
  },
];
