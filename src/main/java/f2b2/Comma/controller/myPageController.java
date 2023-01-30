package f2b2.Comma.controller;

import f2b2.Comma.domain.post.Post;
import f2b2.Comma.domain.post.PostService;
import f2b2.Comma.domain.stack.UserStackService;
import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.dto.auth.SignupDto;
import f2b2.Comma.repository.UserRepository;
import f2b2.Comma.repository.UserStackRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
public class myPageController {

    private static String uploadFolder;

    @Value("${file.path}")
    public void setUploadFolder(String uploadFolder) {
        this.uploadFolder = uploadFolder;
    }

    private final PostService postService;
    private final UserService userService;
    private final UserRepository userRepository;

    private final UserStackService userStackService;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secretKey;

    @GetMapping("/myPost")
    public ResponseEntity<?> myPostJWT(@RequestHeader HttpHeaders headers){
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        Long userId = Long.parseLong(claims.getBody().get("id").toString());
        List<Post> posts = postService.findAllByUser(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "나의 글 찾기 성공", posts), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/withdrawal")
    public ResponseEntity<?> withdrawalJWT(@RequestHeader HttpHeaders headers){
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        Long userId = Long.parseLong(claims.getBody().get("id").toString());
        String username = claims.getBody().get("sub").toString();
        userService.delete(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, username + " 유저 삭제 성공", null), HttpStatus.OK);
    }

    @Transactional
    @PostMapping(value = "/changeInfo", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> changeInfoJWT(@ModelAttribute  SignupDto signupDto, BindingResult bindingResult,@RequestHeader HttpHeaders headers){
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(headers.get("Authorization").get(0));
        Long userId = Long.parseLong(claims.getBody().get("id").toString());
        User user = userService.find(userId);

        if(user.getKakaoId()==null&&user.getGoogleId()==null) {
            if (!passwordEncoder.matches(signupDto.getPrePassword(), user.getPassword())) {
                return new ResponseEntity<>(new CMRespDto<>(-1, "기존 비밀번호가 올바르지 않습니다.", null), HttpStatus.OK);
            }
        }

        if(signupDto.getPassword().length()!=0){
            user.setPassword(passwordEncoder.encode(signupDto.getPassword()));
        }

        if(!user.getNickName().equals(signupDto.getNickName())) {
            if (signupDto.getNickName() != null) {
                if (!userRepository.findByNickName(signupDto.getNickName()).isEmpty()) {
                    return new ResponseEntity<>(new CMRespDto<>(-1, "이미 존재하는 닉네임입니다.", null), HttpStatus.OK);
                }
                user.setNickName(signupDto.getNickName());
            }
        }

        userStackService.delete(userId);


        if(signupDto.getStack()!=null){
            for (Long n : signupDto.getStack()) {
                userStackService.save(userId,n);
            }
        }


        if(signupDto.isBasicImage()){
            user.setImageUrl("nonUrl");
        }

        else if(signupDto.getFile()!=null){
            UUID uuid = UUID.randomUUID();
            String imageFileName = uuid +"_"+signupDto.getFile().getOriginalFilename();
            Path imageFilePath = Paths.get(uploadFolder+imageFileName);

            try{
                Files.write(imageFilePath,signupDto.getFile().getBytes());
            }catch (Exception e){
                e.printStackTrace();
            }
            user.setImageUrl("/upload/"+imageFileName);
        }

        return new ResponseEntity<>(new CMRespDto<>(1, " 정보 변경 성공", user), HttpStatus.OK);
    }


}
