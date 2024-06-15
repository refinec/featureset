import React, { useState, useRef, useEffect, useCallback } from "react";
import { throttle } from 'lodash-es'

interface IDOMBoundaryAttrsProps {
  clientTop: number;
  clientLeft: number;
  clientHeight: number;
  clientWidth: number;
  offsetHeight: number;
  offsetWidth: number;
  offsetLeft: number;
  offsetTop: number;
  scrollHeight: number;
  scrollWidth: number;
  scrollLeft: number;
  scrollTop: number;
}

/** Dom的边界属性：clientWidth、offsetWidth、scrollWidth等 */
const DomBoundaryAttrs: React.FC = () => {
  const [boundaryAttrs, setBoundaryAttrs] = useState<IDOMBoundaryAttrsProps>();
  const parentDomRef = useRef<HTMLDivElement>(null);
  const domRef = useRef<HTMLDivElement>(null);
  const setInfo = useCallback((node: HTMLDivElement) => {
    if (!node) {
      return;
    }
    const {
      clientTop,
      clientLeft,
      clientHeight,
      clientWidth,
      offsetHeight,
      offsetWidth,
      offsetLeft,
      offsetTop,
      scrollHeight,
      scrollWidth,
      scrollLeft,
      scrollTop,
    } = node;
    setBoundaryAttrs({
      clientTop,
      clientLeft,
      clientHeight,
      clientWidth,
      offsetHeight,
      offsetWidth,
      offsetLeft,
      offsetTop,
      scrollHeight,
      scrollWidth,
      scrollLeft,
      scrollTop,
    });
  }, []);
  useEffect(() => {
    if (!domRef.current) {
      return;
    }
    console.log("指定的偏移容器 :>> ", domRef.current?.offsetParent);
    setInfo(domRef.current);
    const resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach((entry) => {
        setInfo(entry.target as HTMLDivElement);
      });
    });
    resizeObserver.observe(domRef.current);
    const scrollFn = throttle(() => {
      setInfo(parentDomRef.current!);
    }, 300);
    parentDomRef.current?.addEventListener("scroll", scrollFn);
    return () => {
      resizeObserver.disconnect();
      parentDomRef.current?.removeEventListener("scroll", scrollFn);
    };
  }, []);
  return (
    <section className="w-screen h-screen p-4">
      <div className="flex">
        <ul className="min-w-fit mr-4">
          <li>clientTop(元素的顶部边框的宽度): {boundaryAttrs?.clientTop}px</li>
          <li>clientLeft(元素的左边框的宽度): {boundaryAttrs?.clientLeft}px</li>
          <li>
            clientHeight(返回内容的可视高度(高度包含 padding)):
            {boundaryAttrs?.clientHeight}px
          </li>
          <li>
            clientWidth(返回内容的可视宽度(高度包含 padding)):
            {boundaryAttrs?.clientWidth}px
          </li>
          <li>
            offsetHeight(返回元素的高度(高度包括 border、padding,不包含margin)):
            {boundaryAttrs?.offsetHeight}px
          </li>
          <li>
            offsetWidth(返回元素的宽度(高度包括 border、padding,不包含margin)):
            {boundaryAttrs?.offsetWidth}px
          </li>
          <li>offsetParent(返回元素的偏移容器): 看控制台</li>
          <li>
            offsetLeft(返回当前元素相对于offsetParent节点左边界的偏移值,包括margin):
            {boundaryAttrs?.offsetLeft}px
          </li>
          <li>
            offsetTop(返回当前元素相对于offsetParent节点顶部边界的偏移值,包括margin):
            {boundaryAttrs?.offsetTop}px
          </li>
          <li>
            scrollHeight(返回元素的整个高度(包括带滚动条的隐蔽的地方)):
            {boundaryAttrs?.scrollHeight}px
          </li>
          <li>
            scrollWidth(返回元素的整个宽度(包括带滚动条的隐蔽的地方)):
            {boundaryAttrs?.scrollHeight}px
          </li>
          <li>
            scrollLeft(返回当前视图中的实际元素的左边缘和左边缘之间的距离):
            {boundaryAttrs?.scrollLeft}px
          </li>
          <li>
            scrollTop(返回当前视图中的实际元素的顶部边缘和顶部边缘之间的距离):
            {boundaryAttrs?.scrollTop}px
          </li>
        </ul>
        <div
          ref={parentDomRef}
          className="w-[300px] h-[300px] flex-grow overflow-auto relative"
        >
          <div
            ref={domRef}
            className="bg-green-200 p-4 m-4 w-[800px] h-[800px] box-content border-4 border-x-red-950 border-y-yellow-400"
          >
            <div>padding: 16px; </div>
            <div>margin: 16px; </div>
            <div>width: 800px; </div>
            <div>height: 800px;</div>
            <div>border: 4px</div>
          </div>
        </div>
      </div>
      <img
        className="w-screen mt-4"
        src="https://www.runoob.com/wp-content/uploads/2021/10/L0hUTUw15byA5Y-R5paH5qGjL2ltYWdlcy9Dc3NCb3hNb2RlbC5wbmc.png"
        alt=""
      />
    </section>
  );
};

export default DomBoundaryAttrs;
