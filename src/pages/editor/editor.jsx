import PageEditor from "./pageEditor/pageEditor";
import SideBarElements from "./sideBarElements/sideBarElements";

function Editor() {
  return (
    <div className="h-[100vh] max-h-[100vh] min-h-[100vh] flex">
      <SideBarElements />
      <PageEditor />
    </div>
  );
}

export default Editor;
