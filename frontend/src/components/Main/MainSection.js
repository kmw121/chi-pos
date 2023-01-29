import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { stacks } from "../../util/stack";
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
  StackImgStyle,
  SelectedStackImgStyle,
  StackBtnSpan,
} from "./mainComponents";

function MainSection({ setSearchConfig, setList }) {
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
    setSectionTextList(
      sectionTextList.map((a) =>
        a.category === category
          ? { ...a, isSelected: true }
          : { ...a, isSelected: false }
      )
    );
  };
  const onClickCategoryStackChanged = (category) => {
    setSectionStack(
      [...stacks].filter((a) =>
        category.category === "모두보기"
          ? a.name !== ""
          : category.category === "인기"
          ? a.isPopular === true
          : a.category.includes(category.name)
      )
    );
  };
  const onClickStackSelected = (stack) => {
    const isIncluded = selectedStack.includes(stack);
    if (!isIncluded) {
      const clickStack = selectedStack.concat(stack);
      const stackNumber = stacks.filter((a) => a.name === stack)[0].number;
      setList([]);
      setSearchConfig((prev) => {
        return {
          ...prev,
          stack: [...prev.stack, stackNumber],
          page: 1,
        };
      });
      setSelectedStack(clickStack);
    } else {
      const stackNumber = stacks.filter((a) => a.name === stack)[0].number;
      setSearchConfig((prev) => {
        return { ...prev, stack: prev.stack.filter((n) => n !== stackNumber) };
      });
      setSelectedStack(selectedStack.filter((a) => a !== stack));
    }
  };
  const onClickXBtn = (stack) => {
    const stackNumber = stacks.filter((a) => a.name === stack)[0].number;
    setSearchConfig((prev) => {
      return { ...prev, stack: prev.stack.filter((n) => n !== stackNumber) };
    });
    setSelectedStack(selectedStack.filter((a) => a !== stack));
  };
  const onFilterClear = () => {
    setSelectedStack([]);
    setList([]);
    setSearchConfig((prev) => {
      return { ...prev, stack: [], categoryType: "" };
    });
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
            <StackImgStyle alt="stack_logo" src={`./logo/${stack.name}.png`} />
            <StackBtnSpan onClick={() => onClickStackSelected(stack.name)}>
              {stack.name}
            </StackBtnSpan>
          </StackBtnLi>
        ))}
      </StackBtnUl>
      <SelectedStackContainer>
        {selectedStack.map((stack) => (
          <SelectedStackUl key={stack}>
            <SelectedStackLi>
              <SelectedStackImgStyle src={`/logo/${stack}.png`} alt="stack" />
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
