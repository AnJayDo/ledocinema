import React, { Component } from 'react';
import './MemberPage.css'
import star from '../../Images/star.jpg'
import thanhtinhdiem from '../../Images/thanhtinhdiem.jpg'
import chinhsachdoiqua from '../../Images/chinhsachdoiqua.jpg'
import bangquyenloi from '../../Images/bangquyenloi.jpg'
import huongdandangky from '../../Images/huongdandangky.jpg'
import motstar from '../../Images/motstar.jpg'
import Cookies from 'js-cookie'

class MemberPage extends Component {
    componentDidMount() {
        if(Cookies.get("jwt")) {
            document.getElementById("pills-signup-tab").style.display="none"
        }
    }
    onClickTab = (id) => {
        if(id!=="pills-signup") {
            document.getElementsByClassName("header-text")[2].className="not-header-text"
            document.getElementById(`${id}-tab`).className="header-text"
            document.getElementsByClassName('show')[0].className="tab-pane"
            document.getElementById(id).className="tab-pane show"
        }
        else {
            document.getElementById('loginButton').getElementsByTagName('a')[0].click()
        }
    }
    render() {
        return (
            <div className='MemberPage'>
                <div className="center"><h1>LDC MEMBERSHIP</h1></div>
                <br />
                <ul class="memberNav" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="header-text" onClick={() => this.onClickTab("pills-home")} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">THỂ LỆ</a>
                    </li>
                    <li class="nav-item">
                        <a class="not-header-text" onClick={() => this.onClickTab("pills-profile")} id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">QUYỀN LỢI</a>
                    </li>
                    <li class="nav-item">
                        <a class="not-header-text" onClick={() => this.onClickTab("pills-contact")} id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">HƯỚNG DẪN</a>
                    </li>
                    <li class="nav-item">
                        <a class="not-header-text" onClick={() => this.onClickTab("pills-signup")} id="pills-signup-tab" data-toggle="pill" href="#pills-signup" role="tab" aria-controls="pills-signup" aria-selected="false">ĐĂNG KÝ</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane show" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <p class="p" style={{ fontWeight: "bold" }}><br />THỂ LỆ</p>
                        <p class="p">Chương trình khách hàng thân thiết Galaxy là chương trình ưu đãi dựa trên điểm tích lũy của các thành viên gồm Star, G-star, X-star. Với mỗi giao dịch tại hệ thống rạp Galaxy, bạn sẽ nhận được điểm thưởng tương ứng. Hình thức tích lũy như sau: </p><br />
                        <div class="center"><img src={star} /></div>
                        <p class="p" style={{ fontWeight: "bold" }}>Cách làm tròn điểm thưởng:</p>
                        <p class="p">Từ 0.1 đến 0.4: làm tròn xuống (Ví dụ: 3.2 sao sẽ được tích vào tài khoản 3 sao)<br /> Từ 0.5 đến 0.9: làm tròn lên (Ví dụ: 3.5 sao sẽ được tích vào tài khoản 4 sao)</p>
                        <p class="p" style={{ fontWeight: "bold" }}>Cấp độ thành viên:</p>
                        <div class="center"><img width="700" src={thanhtinhdiem} /></div>
                        <p class="p"><strong>Star</strong> là thành viên thân thiết có tổng chi tiêu trong năm dưới 2,000,000 đồng tính từ ngày 1/1-31/12.<br /> <strong>G-star</strong> là thành viên thân thiết có tổng chi tiêu trong năm từ 2,000,000 đồng đến 3,999,999 đồng tính từ ngày 1/1-31/12.<br /><strong>X-star</strong> là thành viên thân thiết có tổng chi tiêu từ 4,000,000 đồng trở lên tính từ ngày 1/1-31/12.</p>
                        <p class="p" style={{ fontWeight: "bold" }}>Chính sách đổi quà:</p>
                        <div class="center"><img width="700" src={chinhsachdoiqua} /></div>
                        <p class="p" style={{ fontWeight: "bold" }}>Lưu ý:</p>
                        <li class="li">Thông tin định danh thành viên gồm có email và số điện thoại bắt buộc phải hợp lệ.</li>
                        <li class="li"><strong>Email không hợp lệ </strong>là email không có thực tại thời điểm Lê Độ Cinema rà soát dữ liệu thành viên.</li>
                        <li class="li"><strong>Số điện thoại không hợp lệ </strong>là số điện thoại không liên lạc được hoặc số điện thoại không thuộc sở hữu của chủ tài khoản thành viên ở thời điểm Lê Độ Cinema rà soát dữ liệu thành viên.</li>
                        <li class="li">Với các trường hợp không hợp lệ, Lê Độ Cinema có quyền xóa tài khoản thành viên mà không cần thông báo trước.</li>
                        <li class="li">Tài khoản thành viên không có đủ thông tin định danh gồm <strong>email</strong> và <strong>số điện thoại hợp lệ</strong>, <strong>Lê Độ Cinema</strong> có quyền xóa tài khoản thành viên mà không cần thông báo trước.</li>
                        <li class="li">Điểm tích lũy có giá trị áp dụng tại tất cả các rạp Lê Độ Cinema trên toàn quốc.</li>
                        <li class="li">Điểm tích lũy có thời hạn sử dụng là 01 năm (tính từ ngày 01/01/2020-31/12/2020).</li>
                        <li class="li">Điểm tích lũy sẽ bị trừ sau mỗi lần đổi quà.</li>
                        <li class="li">Không giới hạn số lượng quà tặng được đổi.</li>
                        <li class="li">Bạn có thể dễ dàng kiểm tra điểm tích lũy của mình trên Website Lê Độ Cinema hoặc Ứng dụng LDC trên điện thoại (Mobile App).</li>
                    </div>
                    <div class="tab-pane" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <p class="p" style={{ fontWeight: "bold" }}>Quyền lợi chính:</p>
                        <div class="center"><img width="800" src={bangquyenloi} /></div>
                        <p class="p" style={{ fontWeight: "bold" }}>Chú ý:</p>
                        <li class="li">Quà tri ân sẽ được trao vào cuối năm cho thành viên X-Star.</li>
                        <p class="p" style={{ fontWeight: "bold" }}>Quyền lợi khác:</p>
                        <li class="li">Tham dự buổi công chiếu ra mắt cùng các sao: cơ hội cùng các ngôi sao nổi tiếng tham dự buổi ra mắt phim.</li>
                        <li class="li">Nhận quà tặng độc đáo vào các ngày lễ lớn như Valentine, 8/3…</li>
                        <li class="li">Cơ hội nhân đôi/nhân ba điểm tích lũy nhân các sự kiện đặc biệt.</li>
                    </div>
                    <div class="tab-pane" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                        <p class="p" style={{ fontWeight: "bold" }}>Chỉ với 3 bước đơn giản để trở thành thành viên thân thiết của Lê Độ Cinema:</p>
                        <div class="center"><img width="700" src={huongdandangky} /></div>
                        <p class="p" style={{ fontWeight: "bold" }}>Hướng dẫn đăng ký thành viên:</p>
                        <li class="li">Tải Mobile App:</li>
                        <h3>
                            + App Android: <a href="https://bit.ly/2N6LjLx">https://bit.ly/2N6LjLx</a><br />
                    + App IOS: <a href="https://apple.co/2JA4sDl">https://apple.co/2JA4sDl</a><br />
                        </h3>
                        <li class="li">Hoặc: Trực tiếp đến các quầy chăm sóc khách hàng tại các rạp Lê Độ Cinema trên toàn quốc để được mở tài khoản thành viên.</li>
                        <p class="p" style={{ fontWeight: "bold" }}>Hướng dẫn tích luỹ điểm:</p>
                        <p class="p">Thành viên mua bất kỳ sản phẩm đang được bán tại các rạp Lê Độ Cinema trên toàn quốc hoặc thanh toán trực tuyến sẽ được tích lũy điểm thưởng tương ứng vào tài khoản.</p>
                        <div class="center"><img width="400" src={motstar} /></div>
                        <p class="p">Áp dụng với tất cả sản phẩm: vé xem phim, nước uống, thức ăn, combo …</p>
                        <p class="p"><strong>Lưu ý: </strong>Đối với những giao dịch trực tuyến, thành viên phải đăng nhập vào tài khoản mới được quyền tích điểm hợp lệ.</p>
                        <p class="p" style={{ fontWeight: "bold" }}>Hướng dẫn đổi quà:</p>
                        <p class="p">Thành viên đổi quà trực tiếp tại các cụm rạp <strong>Lê Độ Cinema </strong>theo các bước sau:</p>
                        <p class="p">Bước 1: Thành viên trình barcode trên mobile app/thẻ thành viên tại quầy vé hoặc quầy bắp nước.</p>
                        <p class="p">Bước 2: Thông báo với nhân viên quà tặng muốn qui đổi.</p>
                        <p class="p">Bước 3: Nhân viên kiểm tra số điểm tích lũy của thành viên. Nếu đủ điểm sẽ tiến hành đổi quà.</p>
                    </div>
                    <div class="tab-pane" id="pills-signup" role="tabpanel" aria-labelledby="pills-signup-tab">
                    </div>
                </div>
            </div>
        )
    }
}

export default MemberPage
