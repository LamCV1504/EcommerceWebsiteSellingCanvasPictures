package com.webtranh.util;

import com.webtranh.repository.user.UserEntity;
import jakarta.mail.internet.MimeMessage;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailUtil {

    @NonNull final JavaMailSender emailSender;
    @NonNull final JwtUtil jwtUtil;
    @NonNull final Environment env;

    public void forgotPassword(UserEntity user) {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        String css = "background-color: #5046E4;"+
                "border: none;"+
                "color: white;"+
                "padding: 16px 32px;"+
                "text-align: center;"+
                "text-decoration: none;"+
                "display: inline-block;"+
                "font-size: 16px;"+
                "margin: 4px 2px;"+
                "transition-duration: 0.4s;"+
                "cursor: pointer;"+
                "border-radius: 30px";
        String h3 = "<h3>Chào "+user.getFirstName()+ " " + user.getLastName() +",</h3><br>";
        String text1 = "<p>Chúng tôi nhận được yêu cầu thay đổi mật khẩu của bạn!</p>";
        String text2 = "<p>Nếu bạn không thực hiện thì vui lòng bỏ qua email này</p><br>";
        String text3 = "<p>Nếu không, vui lòng nhập mã code dưới đây</p><br><br>" + user.getCode();
        String htmlMsg = h3+ text1 + text2 + text3;

        try {
            helper.setText(htmlMsg, true); // Use this or above line.
            helper.setFrom("Travel-Viet-Nam");
            helper.setTo(user.getEmail());
            helper.setSubject("Thay đổi mật khẩu");

            emailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
