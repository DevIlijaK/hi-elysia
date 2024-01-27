import { Footer } from "./footer";
import { Header } from "./header";

export function SideNav({ children }: PropsWithChildren) {
  console.log("Children je: ", children);
  return (
    <div class="relative flex flex-col h-screen" style={children.backgroundUrl}>
      <div
        id="proba123"
        class="z-10 
        absolute 
       "
        style="height: 10vh; width: 7vh; "
      >
        <img id="image123" src={children.heroImageUrl} />
      </div>
      <button id="startGame" class="startGameButton">
        Da li želite da započnete igricu?
      </button>
      <Header />
      <div id="content" class="flex-grow">
        {children.children}
      </div>
      <Footer />
    </div>
  );
}
