
import { Link } from "react-router-dom";
import img_travel from '../../assets/travel_stock.png'
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "../../utilities/IconSvg";
import { scrollToTop } from "../scrollTop/ScrollBtn";

export default function Footer() {
  return (
    <div>
      <footer className="px-4 divide-y bg-gray-100 text-gray-800">
        <div className="container flex flex-col pb-10 justify-between lg:py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className="lg:w-1/3">
            <Link
              onClick={scrollToTop}
              rel="noopener noreferrer"
              className="flex justify-center space-x-3 lg:justify-start" to={""}            >
              <img className="h-48" src={img_travel} alt="travel_logo" />
            </Link>
          </div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-900">
                Giới thiệu
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Phương thức hoạt động
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Lý tưởng
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Nhà đầu tư
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Cơ hội nghề nghiệp
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-900">Dịch vụ</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Tổ chức tour
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Trở thành đối tác
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Cộng đồng
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="uppercase text-gray-900">Hỗ trợ</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Tùy chọn hủy
                  </Link>
                </li>
                <li>
                  <Link
                    rel="noopener noreferrer"
                    className="hover:text-red-500 duration-300"
                    onClick={scrollToTop} to={""}                  >
                    Biện pháp mùa dịch
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase text-gray-900">Social media</div>
              <div className="flex justify-start space-x-3">
                <Link
                  rel="noopener noreferrer"
                  onClick={scrollToTop}
                  title="Facebook"
                  className="flex items-center p-1 hover:text-red-500 duration-300" to={""}                >
                  <FacebookIcon />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  onClick={scrollToTop}
                  title="Twitter"
                  className="flex items-center p-1 hover:text-red-500 duration-300" to={""}                >
                  <TwitterIcon />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  onClick={scrollToTop}
                  title="Instagram"
                  className="flex items-center p-1 hover:text-red-500 duration-300" to={""}                >
                  <InstagramIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center text-gray-600">
          © 2022 Company Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
