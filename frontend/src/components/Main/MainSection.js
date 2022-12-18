import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { stacks } from "../../stack";
import {
  StackBtnLi,
  SectionContainer,
  CategoryUl,
  CategoryLi,
  SelectedStackContainer,
  CategoryLiAfter,
  SelectedFilterClear,
  StackBtnUl,
  SelectedStackLi,
  SelectedStackUl,
} from "../components";
function MainSection() {
  const [sectionTextList, setSectionTextList] = useState([
    {
      category: "인기",
      isSelected: true,
    },
    {
      category: "모두보기",
      isSelected: false,
    },
    {
      category: "프론트엔드",
      isSelected: false,
      name: "FE",
    },
    { category: "백엔드", isSelected: false, name: "BE" },
    {
      category: "모바일",
      isSelected: false,
      name: "Mobile",
    },
    {
      category: "기타",
      isSelected: false,
      name: "ETC",
    },
  ]);
  // 이 isShown : true || false로 render 결정하는거 어떰?
  // useRef 이용해서 게시판 input rerendering 막을것
  const [sectionStack, setSectionStack] = useState([
    { name: "JavaScript", category: "FE", isPopular: true },
    { name: "TypeScript", category: "FE", isPopular: true },
    { name: "React", category: "FE", isPopular: true },
    { name: "Vue", category: "FE", isPopular: true },
    { name: "Svelte", category: "FE", isPopular: true },
    { name: "NextJs", category: "FE", isPopular: true },
    { name: "NodeJs", category: "BE", isPopular: true },
    { name: "Java", category: "BE", isPopular: true },
    { name: "Spring", category: "BE", isPopular: true },
    { name: "Go", category: "BE", isPopular: true },
    { name: "Nestjs", category: "BE", isPopular: true },
  ]);
  const [selectedStack, setSelectedStack] = useState([]);
  const onClickCategorySelected = (category) => {
    const changeList = sectionTextList.map((a) =>
      a.category === category
        ? { ...a, isSelected: true }
        : { ...a, isSelected: false }
    );
    setSectionTextList(changeList);
  };
  const onClickCategoryStackChanged = (category) => {
    const changeStack = [...stacks].filter((a) =>
      category.category === "모두보기"
        ? a.name !== ""
        : category.category === "인기"
        ? a.isPopular === true
        : a.category.includes(category.name)
    );
    setSectionStack(changeStack);
  };
  const onClickStackSelected = (stack) => {
    const isIncluded = selectedStack.includes(stack);
    if (!isIncluded) {
      const clickStack = selectedStack.concat(stack);
      setSelectedStack(clickStack);
    } else {
      const deleteStack = selectedStack.filter((a) => a !== stack);
      setSelectedStack(deleteStack);
    }
  };
  const onClickXBtn = (stack) => {
    const deleteStack = selectedStack.filter((a) => a !== stack);
    setSelectedStack(deleteStack);
  };
  const onFilterClear = () => {
    setSelectedStack([]);
  };
  const isFilterSelected = selectedStack.length !== 0;
  return (
    <SectionContainer>
      <CategoryUl>
        {sectionTextList.map((content) => (
          <CategoryLi
            isSelected={content.isSelected}
            onClick={() => {
              onClickCategorySelected(content.category);
              onClickCategoryStackChanged(content);
            }}
            key={content.category}
          >
            {content.category}
            {content.isSelected && <CategoryLiAfter />}
          </CategoryLi>
        ))}
      </CategoryUl>
      <StackBtnUl>
        {sectionStack.map((stack) => (
          <StackBtnLi
            onClick={() => onClickStackSelected(stack.name)}
            key={stack.name}
          >
            <img
              alt="stack_logo"
              src={`./logo/${stack.name}.png`}
              style={{ width: "30px", height: "30px" }}
            />
            <span onClick={() => onClickStackSelected(stack.name)}>
              {stack.name}
            </span>
          </StackBtnLi>
        ))}
      </StackBtnUl>
      <SelectedStackContainer>
        {selectedStack.map((stack) => (
          <SelectedStackUl key={stack}>
            <SelectedStackLi>
              {stack} <FiDelete onClick={() => onClickXBtn(stack)} />
            </SelectedStackLi>
          </SelectedStackUl>
        ))}
        {isFilterSelected && (
          <SelectedFilterClear onClick={onFilterClear}>
            필터 초기화
          </SelectedFilterClear>
        )}
      </SelectedStackContainer>
    </SectionContainer>
  );
}

export default MainSection;