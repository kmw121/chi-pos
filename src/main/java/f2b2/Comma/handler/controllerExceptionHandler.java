package f2b2.Comma.handler;

import f2b2.Comma.dto.CMRespDto;
import f2b2.Comma.handler.exception.CustomAuthException;
import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.handler.exception.CustomValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class controllerExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> apiException(CustomException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), null), HttpStatus.OK);
    }

    @ExceptionHandler(CustomAuthException.class)
    public ResponseEntity<?> authException(CustomAuthException e) {
        return new ResponseEntity<>(new CMRespDto<>(2, e.getMessage(), e.getId()), HttpStatus.OK);
    }

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> apiException(CustomValidationException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.OK);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<?> missingCookieException(MissingRequestCookieException e){
        return new ResponseEntity<>(new CMRespDto<>(-1,"유저 정보가 전달되지 않았습니다.(쿠키 미싱 에러)",null),HttpStatus.OK);
    }

}
