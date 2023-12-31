import { Form, Link, redirect, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const collegeResponse = await fetch(`/api/colleges/${params.collegeId}`);
  const college = await collegeResponse.json();
  return { college };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  let postData = Object.fromEntries(formData);
  postData.MajorId = parseInt(params.majorId);
  console.log(params.majorId);
  console.log(postData);
  //console.log(formData);
  if (
    postData.content.trim().length <= 0 ||
    postData.title.trim().length <= 0
  ) {
    alert("Please enter title and contents for your post.");
    // return redirect(`/colleges/${params.collegeId}/majors/${params.majorId}/create-post`);
    return null;
  } else {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        return redirect(
          `/colleges/${params.collegeId}/majors/${params.majorId}`
        );
      }
      const { errors } = await response.json();
      console.log("invalid");
      return errors;
    } catch (error) {
      console.error(error);
      return "Whoops! Something went wrong";
    }
  }
}

const CreatePost = () => {
  const { college } = useLoaderData();
  // const errors = useActionData();

  return (
    <Form
      method="post"
      className="flex flex-col justify-center items-center text-center divide-y-[1px] divide-white
      xl:w-[60rem] mb-[25rem]"
    >
      <div className="bg-white my-10 rounded-lg hover:scale-95 ease-in-out duration-300">
        <Link
          className="
        
        "
          to={`/colleges/${college.id}`}
        >
          <div
            style={{ "--image-url": `url(${college.logo})` }}
            className="bg-[image:var(--image-url)] w-[14rem] h-[6rem] bg-center bg-cover"
          ></div>
        </Link>
      </div>
      <div className="text-center pt-10">
        <div className="mb-10 flex justify-center items-center">
          <p className="text-white text-5xl font-bold">{`What's on your mind?`}</p>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center">
            <div className="flex flex-col gap-10">
              {/* {errors && <div className="text-red-300">{errors}</div>} */}
              <fieldset className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-lg py-2 text-center rounded-lg border-t-[1px] border-gray-500
                "
                >
                  Title
                </label>
                <textarea
                  placeholder=""
                  type="text"
                  name="title"
                  id="title"
                  className="
                  bg-[#272727] focus:outline-none px-10 py-8 text-white w-[56rem] h-[10rem] 
                  focus:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)] rounded-lg focus:text-black
                  shadow-[0px_0px_5px_rgba(0,0,0,0.40)] focus:bg-gray-200 text-4xl transition
                  duration-200 resize-none
                  min-w-[10rem]
                  sm:w-[20rem] 
                  md:w-[26rem]
                  lg:w-[35rem]
                  xl:w-[50rem]
                  "
                />
              </fieldset>
              <fieldset className="flex flex-col">
                <label
                  htmlFor="company"
                  className="text-lg py-2 text-center rounded-lg border-t-[1px] border-gray-500
                "
                >
                  Thoughts
                </label>
                <textarea
                  placeholder=""
                  type="text"
                  name="content"
                  id="content"
                  className="
                bg-[#272727] focus:outline-none px-10 py-8 text-white h-[30rem] 
                  focus:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)] rounded-lg focus:text-black
                  shadow-[0px_0px_5px_rgba(0,0,0,0.40)] focus:bg-gray-200 transition
                  duration-200 resize-none
                  min-w-[10rem]
                  sm:w-[20rem] 
                  md:w-[26rem]
                  lg:w-[35rem]
                  xl:w-[50rem]
                  "
                />
              </fieldset>
            </div>
          </div>
          <div className="flex justify-center mx-auto text-center">
            <div className="ml-10">
              <button
                className="px-10 py-6 bg-[#272727] rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.40)] 
              hover:bg-fuchsia-500 transition duration-200 hover:shadow-[inset_0_0px_10px_rgba(0,0,0,0.5)]
              font-bold border-b-[1px] border-fuchsia-700
              "
              >
                Submit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreatePost;
