export function UploadPicture() {
  return (
    <div class="container mx-auto py-8 select-none">
      <form class="bg-white p-4 rounded shadow-lg">
        <div style="height: 500px" class="mt-6 relative w-full bg-blue-300">
          <div
            class="
              absolute 
              top-1/2 
              left-1/2 
              transform 
              -translate-x-1/2 
              -translate-y-1/2 
              bg-blue-500
              text-white
              border-none 
              inline-block 
              rounded 
              shadow-lg
              "
          >
            <label
              for="imageInput"
              class="cursor-pointer select-none 
        
            
              "
            >
              <i class="material-icons text-4xl sm:text-6xl md:text-8xl lg:text-10xl xl:text-12xl">
                upload_file
              </i>

              <input
                type="file"
                accept="image/*"
                class="hidden"
                id="imageInput"
                _="
              on change set file to my.files[0] then 
              js (file) 
              let something = URL.createObjectURL(file)
              imagePreview.src = something
              end then remove .hidden from #imageDiv"
              />
            </label>
          </div>
          <div id="imageDiv" class="full hidden">
            <img id="imagePreview" src="#" alt="Preview" />
          </div>
        </div>
      </form>
    </div>
  );
}
