package f2b2.Comma.dto.auth;

import f2b2.Comma.domain.user.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Data
@Component
public class OauthSignupDto {
    private static String uploadFolder;

    @Value("${file.path}")
    public void setUploadFolder(String uploadFolder) {
        this.uploadFolder = uploadFolder;
    }


    @NotBlank(message = "username을 입력해주세요.")
    private String username;

    @NotBlank(message ="닉네임은 필수입니다.")
    private String nickName;

    private MultipartFile file;

    private List<Long> stack;



    public User toEntity(){
        User user = new User();
        user.setPassword(UUID.randomUUID().toString());
        user.setUsername(this.username);
        user.setNickName(this.nickName);

        if(file!=null){
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid +"_"+file.getOriginalFilename();
            Path imageFilePath = Paths.get(uploadFolder+imageFileName);

            try{
                Files.write(imageFilePath,file.getBytes());
            }catch (Exception e){
                e.printStackTrace();
            }
            System.out.println(imageFilePath);
            user.setImageUrl(imageFilePath.toString());
        }
        else{
            user.setImageUrl("nonUrl");
        }

        return user;
    }
}
