package f2b2.Comma.user;

import f2b2.Comma.domain.user.User;
import f2b2.Comma.domain.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;


@SpringBootTest
@Transactional
class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    public void test() throws Exception{


        System.out.println("실행1");
        //given
        User user = new User();
        user.setName("치킨");

        System.out.println("실행2");
        //when

        User save = userService.save(user);

        System.out.println("실행3");

        //then

        org.assertj.core.api.Assertions.assertThat(save.getName()).isEqualTo("치킨");
    }

}