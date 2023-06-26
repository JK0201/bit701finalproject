package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import data.dto.BoardDto;
import data.mapper.BoardMapper;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardService implements BoardServiceInter{

    private BoardMapper boardMapper;

    @Override
    public BoardDto detailPage(int num) {
        return boardMapper.detailPage(num);
    }

    @Override
    public List<BoardDto> getPargingList(int start, int perpage) {
        Map<String,Object> map= new HashMap<>();
        map.put("start",start);
        map.put("perpage",perpage);

        return boardMapper.getPargingList(map);
    }

    @Override
    public void insertBoard(BoardDto dto) {
        boardMapper.insertBoard(dto);
    }

    @Override
    public void updateReadcount(int num) {
        boardMapper.updateReadcount(num);
    }

    @Override
    public int getTotalCount() {
        return boardMapper.getTotalCount();
    }

    @Override
    public void deleteBoard(int num) {
        boardMapper.deleteBoard(num);
    }
    
    
}
