# Agri-Cure
Our agricultural website uses machine learning to quickly and accurately detect plant diseases from images of infected leaves. Our goal is to help farmers and agricultural professionals identify and treat crop diseases faster, leading to healthier crops and higher yields.

![Screenshot (6)](https://user-images.githubusercontent.com/76547661/228484725-6577454f-f3ef-4cb0-9e95-8e349f4dbb57.png)


# Installation
Clone the repository by running git clone https://github.com/Denver04/gfg-hackthon.git in your terminal.


# Getting Started with Create React App (frontend)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project's frontend directory, you can run:

### `npm install`

Installs all the required modules by this react project to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Starting Backend (go to fullWebsite directory)

## Getting Started with Django
1. Create a virtual environment by running python -m venv myenv and activate it by running source myenv/bin/activate on Linux or myenv\Scripts\activate on Windows.
2. Install the required packages by running pip install -r requirements.txt
3. Run python manage.py makemigrations and python manage.py migrate to create the database and apply the migrations.
4. Use command, "django-admin createsuperuser" to create a superuser.
5. This is an important step, you will have to change the path of the models in the process_image.py file, just navigate to the directory where you have cloned this repo, go to gfg-hackthon>fullWebite>backend>process_image.py file, there are three paths hardcoded on lines 88, 98 and 103,
![image](https://user-images.githubusercontent.com/76547661/229268502-60e3ba42-2225-4136-a42d-068d7932899a.png)
![image](https://user-images.githubusercontent.com/76547661/229268549-c077e1e6-8fcc-4c51-b6d9-7a9056e0cf2b.png)
![image](https://user-images.githubusercontent.com/76547661/229268620-9b0c2cfc-8650-4961-b273-a0f754955aaa.png)
change these paths according to your directory leading right to the models and Result file with appropriate slashes'/'.
6. Linux users might need to install a package for successful import of opencv, which can  be accomplished by running the cmd `sudo apt-get update && apt-get install libgl1`
7. Run python manage.py runserver to start the development server.
8. Open http://127.0.0.1:8000/admin in your browser and login with superuser credentials to access the backend REST framework.

# Features
1. User can upload an image of a leaf and get the results accordinly.

![Screenshot (12)](https://user-images.githubusercontent.com/76547661/228485459-2b102872-49e6-40b2-9a9e-b2e33229734e.png)

3. We have a database of 62 different diseases with symptoms, causes and cures.

![Screenshot (15)](https://user-images.githubusercontent.com/76547661/228485911-4798755b-8dca-487c-8d4d-b66de586cca5.png)

5. Users can also contact with the dev team with the help of a contact form.

![Screenshot (18)](https://user-images.githubusercontent.com/76547661/228486275-1f369010-51ff-40ce-ab0f-089583345a7a.png)

7. Excellent UI/UX design, with a well-thought dark/light mode and easy navigation.
8. The website is fully responsive and works on all devices.

![image](https://user-images.githubusercontent.com/76547661/228486735-0d6d38c9-eaff-43c8-9c66-6deb43a7e649.png)   ![Screenshot 2023-03-29 144912](https://user-images.githubusercontent.com/76547661/228490050-07b61361-2083-4270-aaf8-ddf34202fb87.png)



# Tech Stack
1. Frontend: ReactJS, HTML, CSS, JS
2. Backend: Django, Python
3. Database: SQLite
4. Machine Learning: Leaf_detecter(OneClassSVM), Leaf_disease_recognizer(Pre-trained Resnet50 with fine tuning), Frameworks(TensorFlow, Keras, Scikit-Learn).
5. Deployment: Google Cloud Platform with AMD instances and Nginx Server


# Contributors
1. [Abhisek Kumar Singh](https://github.com/Denver04)
2. [Atul Verma](https://github.com/flashzzz)
3. [Umang Kumar](https://github.com/Umang-Kumar)

Any suggestions are welcome! Feel free to open an issue or a pull request.

# Conclusion
We hope you enjoy our website and find it useful. We are always looking for ways to improve our product, so if you have any suggestions, please let us know! And if you have read this down, feel free to star this repo. Thank you for your time and have a great day!
