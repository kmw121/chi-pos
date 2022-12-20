package f2b2.Comma.domain.stack;

import f2b2.Comma.handler.exception.CustomException;
import f2b2.Comma.repository.StackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StackService {

    private final StackRepository stackRepository;

    public Stack find(Long id){
        return stackRepository.findById(id).orElseThrow(()->{
            throw new CustomException("조건에 맞는 스택이 존재하지 않습니다.");
        });
    }

}
