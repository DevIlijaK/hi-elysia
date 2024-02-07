import { Footer } from "./footer";
import { Header } from "./header";

export function SideNav({ children }: PropsWithChildren) {
  return (
    <div
      id="gameWrapper"
      class="relative flex flex-col h-screen"
      style={children.backgroundGifUrl}
    >
      {/* <div  style={children.heroImageUrl}></div> */}
      <img
        id="hero"
        class="z-10 absolute"
        style="display:none"
        src={children.heroImageUrl}
      />
      <button id="startGame" class="startGameButton">
        Da li želite da započnete igricu?
      </button>
      <Header />
      <div id="content" class="flex-grow">
        {children.children}
      </div>
      <Footer />
      <div id="staticImage" style={children.backgroundStaticUrl}></div>
    </div>
  );
}
