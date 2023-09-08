import React from "react";
import Header from "../../components/common/Header";
import Heading from "../../components/common/Heading";
import Footer from "../../components/common/Footer";

const About = () => {
  return (
    <>
      <Header />
      <section className="about">
        <Heading title="VỀ CHÚNG TÔI" />
        <h3>
          {" "}
          Faliz được thành lập với hoài bão mang đến cho khách hàng những sản
          phẩm trang trí không gian sống mới mẻ, hiện đại và thật "cảm xúc". Tất
          cả những sản phẩm tại Faliz đa phần đều được thiết kế và sản xuất bởi
          những bàn tay khéo léo của các bạn trẻ đầy sáng tạo, thẩm mỹ, nhiệt
          huyết và năng động. Việc cập nhật xu hướng mới, cải tiến chất lượng
          sản phẩm, nâng cao dịch vụ chăm sóc khách hàng và đảm bảo giá thành
          cạnh tranh là những tiêu chí quan trọng, bắt buộc nhất đối với Faliz.
          <br></br>
        </h3>
        {/* <h3> <br></br>Hiểu rõ nhu cầu của khách hàng, LEVUSHOP luôn cố gắng mang đến nhiều cải tiến nhất có thể, thường xuyên đa dạng những sản phẩm của chúng tôi để phục vụ khách hàng ngày một tốt hơn. Mang tư duy của những người trẻ, tận tâm với sản phẩm, đảm bảo trong cung cách phục vụ. Chúng tôi luôn mong muốn mang lại cho bạn những trải nghiệm hữu ích, sản phẩm kinh doanh chất lượng, giá thành phù hợp với ngân sách của bạn, dịch vụ hỗ trợ tư vấn chu đáo tận tâm. </h3> */}
        <div className="img">
          <br></br>
          <img src="../images/about/1.jpg" style={{ width: "100%" }} />
        </div>
        <div className="content">
          <h2>
            <br></br>Tại sao lại lựa chọn Faliz
          </h2>
          <h3>
            <br></br>Tỉ Lệ Phản Hồi: 99% (Trong Vài Giờ)<br></br>
            Thời Gian Chuẩn Bị Hàng: Nhanh<br></br>
            100% Tỷ lệ giao hàng đúng hẹn<br></br>
            Đổi trả MIỄN PHÍ trong 7 ngày<br></br>
            Thanh toán khi nhận hàng COD<br></br>
            Free Ship toàn quốc đơn từ 5tr<br></br>
            Hoàn tiền 100% nếu sai quảng cáo<br></br>
            Dịch vụ bảo hành hậu mãi chu đáo tận tình
          </h3>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default About;
