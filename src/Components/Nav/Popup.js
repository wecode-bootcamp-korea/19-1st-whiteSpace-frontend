import Carousel from './Component/Carousel';
// import '../../Styles/common.scss';

const Popup = () => {
  return (
    <div>
      <Carousel>
        {POPUP_DATA.map(popup => (
          <div key={popup.id} style={popup.style}>
            {popup.content}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Popup;

const POPUP_DATA = [
  {
    id: 1,
    content: '지금 회원가입시 여백 1천원 적립금 지급',
    style: {
      backgroundColor: '#ffd711',
      padding: '15px 0',
      textAlign: 'center',
    },
  },
  {
    id: 2,
    content: '카카오 플친 추가시 2,000원 할인 쿠폰 지급!',
    style: {
      backgroundColor: 'skyblue',
      padding: '15px 0',
      textAlign: 'center',
    },
  },
];
