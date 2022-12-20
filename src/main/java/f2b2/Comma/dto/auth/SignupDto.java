package f2b2.Comma.dto.auth;

import f2b2.Comma.domain.user.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class SignupDto {


    @Value("${file.path}")
    private String uploadFolder;
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank(message = "이메일을 입력해주세요.")
    private String username;
    @NotBlank(message ="비밀번호를 입력해주세요.")
    private String password;
    @NotBlank(message ="닉네임은 필수입니다.")
    private String nickName;

    private MultipartFile file;

    private List<Long> stack;

    public User toEntity(){
        User user = new User();
        user.setUsername(this.username);
        user.setNickName(this.nickName);
        user.setPassword(this.password);


        if(file!=null){
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid +"_"+file.getOriginalFilename();

            Path imageFilePath = Paths.get(uploadFolder+imageFileName);

            try{
                Files.write(imageFilePath,file.getBytes());
            }catch (Exception e){
                e.printStackTrace();
            }
            user.setImageUrl(imageFilePath.toString());
        }

        return user;
    }

}
