import React from 'react';
import './Footer.css'
import AppleFooterIcon from '../../Images/Apple-Footer-Icon.png'
import CHPlayFooterIcon from '../../Images/CHPlay-Footer-Icon.png'
import FacebookFooterIcon from '../../Images/Facebook-Footer-Icon.png'
import InstagramFooterIcon from '../../Images/Instagram-Footer-Icon.png'
import TwitterFooterIcon from '../../Images/Twitter-Footer-Icon.png'
import YouTubeFooterIcon from '../../Images/YouTube-Footer-Icon.png'
function Footer() {
    return (
        <div className="Footer" id="footer">
            <div style={{marginTop: '20px'}}>
                <div className="footer-main-container">
                    <div id="footer-about-us">
                        <p className="footer-bold-header">Về chúng tôi</p>
                        <p><a href="#">Giới thiệu</a></p>
                        <p><a href="#">Tiện ích Online</a></p>
                        <p><a href="#">Thẻ quà tặng</a></p>
                        <p><a href="#">Tuyển dụng</a></p>
                    </div>
                    <div id="footer-support">
                        <p className="footer-bold-header">Chăm sóc khách hàng</p>
                        <p>Hotline: 0236 3822 574</p>
                        <p>Giờ làm việc: 8:00 - 22:00 </p>
                        <p>(Tất cả các ngày bao gồm cả Lễ Tết)</p>
                        <p>Email: lucianodanang@gmail.com</p>
                    </div>
                    <div id="footer-information">
                        <p id="footer-social-header">
                            <a href="#"><img className="footer-social" src={YouTubeFooterIcon}/></a>
                            <a href="https://www.facebook.com/46tranphudanang"><img className="footer-social" src={FacebookFooterIcon}/></a>
                            <a href="#"><img className="footer-social" src={InstagramFooterIcon}/></a>
                            <a href="#"><img className="footer-social" src={TwitterFooterIcon}/></a>
                        </p>
                        <p style={{marginTop: '20px'}}>Đia chỉ: 46 Đường Trần Phú, Hải Châu 1, Hải Châu,Đà Nẵng 550000</p>
                        <p id="footer-download" className="footer-bold-header">DOWNLOAD APP ON <img src={AppleFooterIcon} /><img src={CHPlayFooterIcon} /></p>
                    </div>
                </div>
                <p className="footer-cinema-text">{"RẠP LÊ ĐỘ THUỘC QUYỀN SỞ HỮU CỦA TRUNG TÂM PHÁT HÀNH PHIM & CHIẾU BÓNG ĐÀ NẴNG"}</p>
            </div>
        </div>
    )
}

export default Footer;