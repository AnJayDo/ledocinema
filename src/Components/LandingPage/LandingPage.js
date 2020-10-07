import React, { Component } from 'react';
import './LandingPage.css'
import moveek from '../../Images/moveek.png'
import premiumCinema from '../../Images/premiumCinema.png'
import danang from '../../Images/danang.png'
import dolbyAtmos from '../../Images/dolbyAtmos.png'
import momo from '../../Images/momo.png'
import oldLeDoCine from '../../Images/LeDoCinemaOldday.png'
import newLeDoCine from '../../Images/LeDoCinemaNow.png'
import appLeDoCinema from '../../Images/AppLeDoCinema.png'
import getOnGooglePlay from '../../Images/GetGooglePlay.png'
import downloadFromAppleStore from '../../Images/DownloadAppleStore.png'
import AvailableMovies from '../Movies/AvailableMovies'
import SlideshowEvents from './SlideshowEvents'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: ["abc", "abc", "abc", "abc", "abc", "abc"]};
    }
    
    render() {
        return (
            <div className="LandingPage">
                <div id="slide-events">
                    <SlideshowEvents />
                </div>
                <div>
                    <div style={{display: "flex"}}><a href="#" className="header-text">Phim đang chiếu</a><a href="#" className="not-header-text">Phim sắp chiếu</a></div>
                    <div id="movies-list">
                        <AvailableMovies />
                    </div>
                </div>
                <div className="download-app">
                    <div className="download-app-1"><img src={appLeDoCinema}/></div>
                    <div className="download-app-2"><br />
                        Tải app Lê Độ Cinema <br />
                        để có trải nghiệm tốt hơn<br />
                        và mua vé dễ dàng,<br />
                        cập nhật phim mới nhanh chóng<br />
                    </div>
                    <div className="download-app-3">
                        <div>Tải app ngay</div>
                        <div>App Lê Độ Cinema<br />nay đã có mặt trên<br /><br /></div>
                        <div><a href="https://play.google.com/store"><img src={getOnGooglePlay}/></a></div>
                        <div><a href="https://www.apple.com/ios/app-store/"><img src={downloadFromAppleStore}/></a></div>
                    </div>
                </div>
                <div id="aboutLeDoCinema">
                    <div><p className="header-text">Rạp phim Lê Độ</p></div>
                    <div className="aboutCine">
                        <div className="aboutCineText"><p>Nằm ngay khu vực trung tâm ở mặt tiền đường Trần Phú, quận Hải Châu, TP Đà Nẵng,
                            rạp phim Lê Độ có lịch sử lâu đời, là rạp phim quốc doanh duy nhất ra đời từ trước 1975.
                                                        <br /><br />
                            Lãnh đạo UBND TP Đà Nẵng cho rằng, rạp Lê Độ là một trong những thiết chế văn hoá
                            duy nhất còn lại từ các thập niên trước. Qua nhiều năm sử dụng, công trình đã xuống
                            cấp, hư hỏng, hệ thống trang thiết bị của rạp đã quá lạc hậu ảnh hưởng đến hoạt động
                            của rạp. Vì vậy, việc đầu tư cải tạo, nâng cấp Rạp Lê Độ là rất cần thiết nhằm đảm bảo
                            điều kiện cơ sở vật chất để rạp tiếp tục hoạt động phù hợp với sự phát triển của ngành
                            điện ảnh, đảm bảo phục vụ tốt nhu cầu vui chơi, giải trí của người dân và thực hiện
                            các nhiệm vụ chính trị của thành phố.
                                                        <br /><br />
                            Đến 7-2018, Chủ tịch UBND TP Đà Nẵng Huỳnh Đức Thơ đã phê duyệt chủ trương nâng
                            cấp rạp này với kinh phí đầu tư gần 5 tỉ đồng từ nguồn vốn ngân sách. Sau gần 1 năm
                            thi công, đến cuối 2019, rạp Lê Độ được bàn giao và đưa vào sử dụng.
                            <br /></p>
                        </div>
                        <img src={oldLeDoCine} />
                    </div>
                    <div className="aboutCine">
                        <img src={newLeDoCine} />
                        <div className="aboutCineText"><p>Trung tâm Văn hóa - Điện ảnh (đơn vị quản lý rạp Lê Độ) - trực thuộc Sở Văn hóa Thể thao
                            TP Đà Nẵng cho biết, rạp Lê Độ được xây mới trên diện tích 523m2 gồm 3 tầng, tầng 1 là
                            khu vực sảnh chờ (quầy bán vé và nước uống), tầng 2 có 2 phòng chiếu và tầng 3 có 1
                            phòng chiếu. <br/>
                            <br/>
                            Hiện tại, rạp Lê Độ mới đưa vào phục vụ phòng chiếu số 1 với 130 ghế, có hệ thống âm
                            thanh, màn hình hiện đại. Trong giai đoạn 2, hai phòng chiếu còn lại sẽ được đầu tư ghế,
                            âm thanh, màn hình.<br/></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div><p className="header-text">Đơn vị hợp tác</p></div>
                    <div className="sponsor">
                        <img src={moveek} />
                        <img src={dolbyAtmos} />
                        <img src={danang} />
                        <img src={premiumCinema} />
                        <img src={momo} />
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;