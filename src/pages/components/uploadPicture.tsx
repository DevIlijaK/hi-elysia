export function UploadPicture() {
  return (
    <div style="aspect-ratio:3.2/1;" class="mt-6 mb-6 relative bg-blue-300">
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
        <label for="imageInput" class="cursor-pointer select-none">
          <i class="material-icons text-4xl sm:text-6xl md:text-8xl lg:text-10xl xl:text-12xl">
            upload_file
          </i>

          <input
            type="file"
            accept="image/*"
            class="hidden"
            id="imageInput"
            name="mainBlogPicture"
            _="
              on change set file to my.files[0] then 
              js (file) 
              let something = URL.createObjectURL(file)
              imagePreview.src = something
              end then remove .hidden from #imageDiv"
          />
        </label>
      </div>
      <div
        id="imageDiv"
        style="aspect-ratio:3.2/1;"
        class="hidden flex items-center justify-center"
      >
        <img
          id="imagePreview"
          src="#"
          alt="Preview"
          class="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
