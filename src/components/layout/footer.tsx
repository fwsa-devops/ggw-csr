export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-5xl justify-between py-6 md:flex lg:max-w-5xl">
        <div className="mt-2 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-800 dark:text-gray-200">
            Made with ❤️ by FSSA
          </p>
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-800 dark:text-gray-200">
            &copy; 2024 Freshworks, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
