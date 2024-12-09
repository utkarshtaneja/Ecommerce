import logo from "../assets/images/logo.png";
import icon from "../assets/images/icon.png";
import camera from "../assets/images/Camera.png";
import laptop from "../assets/images/Laptop.png";
import mobile from "../assets/images/Mobile.png";
import Header_head from "../assets/images/Header-head.png";
import Header_mouse from "../assets/images/Header-mouse.png";
import Header_speaker from "../assets/images/Header-speaker.png";
import footer from "../assets/images/Footer.png";
import add_icon_green from "../assets/images/add_icon_green.png"
import add_icon_white from "../assets/images/add_icon_white.png"
import add_icon from "../assets/images/add_icon.png"
import remove_icon_red from "../assets/images/remove_icon_red.png"
import rating_stars from "../assets/images/rating_starts.png"
import collections_watch from "../assets/images/Watch.png";
import collections_speaker from "../assets/images/Speaker.png";
import collections_headphones from "../assets/images/Headphones.png";
import collections_camera from "../assets/images/Dslr.png";
import collections_mobile from "../assets/images/Phone.png";
import collections_laptop from "../assets/images/Mac.png";
import collections_mouse from "../assets/images/Mouse.png";
import collections_monitor from "../assets/images/Monitor.png";
import collections_microphone from "../assets/images/Microphone.png";

const images = {
  logo,
  icon,
  camera,
  laptop,
  mobile,
  footer,
  Header_head,
  Header_mouse,
  Header_speaker,
  add_icon_green,
  add_icon_white,
  add_icon,
  remove_icon_red,
  rating_stars,
  collections_mouse,
  collections_monitor,
  collections_microphone,
  collections_camera,
  collections_mobile,
  collections_laptop,
  collections_watch,
  collections_speaker,
  collections_headphones,
};

export default images;

export const collections_list = [
  {
    category_name: "Mobile",
    category_image: images.collections_mobile,
  },
  {
    category_name: "Laptop",
    category_image: images.collections_laptop,
  },
  {
    category_name: "Camera",
    category_image: images.collections_camera,
  },
  {
    category_name: "Mouse",
    category_image: images.collections_mouse,
  },
  {
    category_name: "Watches",
    category_image: images.collections_watch,
  },
  {
    category_name: "Microphone",
    category_image: images.collections_microphone,
  },
  {
    category_name: "Speaker",
    category_image: images.collections_speaker,
  },
  {
    category_name: "Headphones",
    category_image: images.collections_headphones,
  },
  {
    category_name: "Monitor",
    category_image: images.collections_monitor,
  },
];
