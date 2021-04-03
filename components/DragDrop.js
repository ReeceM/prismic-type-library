import { useState } from "react";

const DragDrop = ({
  children,
  id,
  className,
  activeClass,
  inactiveClass,
  onDropEvent = () => { },
  onDragStart = () => { },
  onDragEnd = () => { }
}) => {

  const [dragging, setDragging] = useState(false);

  function onDrop(e) {
    e.preventDefault()

    setDragging(false)
    console.log('File(s) dropped');

    onDropEvent(e.dataTransfer.files);
  }

  function onDragOver(e) {
    e.preventDefault()
    if (dragging) {
      return;
    }

    onDragStart(e)
    setDragging(true)

    console.log('File(s) in drop zone');
    // console.log(e)
  }

  function onDragLeave(e) {
    e.preventDefault()
    onDragEnd(true);
    setDragging(false)
  }

  // if (attachBody) {
  //   useEffect(function(){
  //     document.body.addEventListener('drop', onDrop)
  //     document.body.addEventListener('dragleave', onDragLeave)
  //     document.body.addEventListener('dragover', onDragOver)

  //     return () => { }
  //   }, [])
  // }

  return (
    <>
      {dragging ? <div className="w-full h-screen fixed z-0 inset-0 bg-gray-800 opacity-80"></div> : null}
      <div
        className={`${className} ${dragging ? activeClass : inactiveClass}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        id={id}
      >
        {children}
      </div>
    </>
  )
}

export default DragDrop;
