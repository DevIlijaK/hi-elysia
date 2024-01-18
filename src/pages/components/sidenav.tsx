import { Footer } from "./footer";
import { Header } from "./header";

export function SideNav({ children }: PropsWithChildren) {
  console.log("Children je: ", children);
  return (
    <div class="relative flex flex-col h-screen">
      <div
        id="proba123"
        class="z-10 
        absolute 
        top-1/2 
        border-solid border-2
      border-indigo-600"
        style="height: 77px; width: 50px;"
      >
        <img id="image123" src={children.heroImageUrl} />
      </div>
      <Header />
      <div id="content" class="flex-grow" style={children.backgroundUrl}>
        {children.children}
      </div>
      <Footer />
    </div>
  );
}
