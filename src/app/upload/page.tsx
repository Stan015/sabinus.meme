export default function Upload() {
  return (
    <section className="flex flex-col gap-6 mt-6 px[10%] items-center w-full h-full">
      <h1 className="text-[2.5rem] font-bold w-2/3 text-center">
        Before you upload, try searching to see if the meme already exists.
      </h1>
      <form  className="w-full h-full flex justify-center gap-6 ">
        <div>
          <span>
            <input
              type="file"
              name="meme-file"
              id="meme-file"
              placeholder="Choose or drag and drop file"
            />
            <p>image.png</p>
          </span>

          <div>
            <h3>Preview</h3>
            <span></span>
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="meme-description">Description</label>
            <textarea
              name="meme-description"
              id="meme-description"
              placeholder="What is sabinus up to in the picture?"
              rows={2}
            ></textarea>
          </div>
          <div>
            <label htmlFor="meme-expressions">Select Expression</label>
            <span id="selected-expressions"></span>
            <span id="meme-expressions">
              <p>happy</p>
              <p>crying</p>
              <p>investor’s vibe</p>
              <p>walking</p>
              <p>winning</p>
              <p>laughing</p>
              <p>in trouble</p>
              <p>dancing</p>
              <p>celebrating</p>
              <p>sleeping</p>
            </span>
          </div>
          <div>
            <label htmlFor="image-size">Select Expression</label>
            <span id="selected-image-size"></span>
            <span id="image-size">
              <p>320 x 320</p>
              <p>320 x 400</p>
              <p>320 x 420</p>
              <p>320 x 500</p>
            </span>
          </div>

          <button type="submit">Upload Meme</button>
        </div>
      </form>
    </section>
  );
}
