package f2b2.Comma.dto.auth;

import f2b2.Comma.domain.user.User;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class SignupDto {

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String username;
    @NotBlank(message ="비밀번호를 입력해주세요.")
    private String password;
    @NotBlank
    private String nickName;

    public User toEntity(){
        User user = new User();
        user.setUsername(this.username);
        user.setNickName(this.nickName);
        user.setPassword(this.password);
        return user;
    }

}
