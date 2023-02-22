import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  CogIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function ActionDropdown({ username }: { username?: string }) {
  return (
    <div className="hidden items-center gap-x-8 lg:flex">
      <div>
        <button className=" p-2 hover:bg-white/20">
          <HeartIcon className="h-6 w-6" />
        </button>
        <button className=" p-2 hover:bg-white/20">
          <ShoppingBagIcon className="h-6 w-6" />
        </button>
      </div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center gap-x-2  py-2 px-4 hover:bg-white/20">
            {username || "Profile"}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-cyan-600 text-white" : "text-gray-900"
                    } group flex w-full items-center  px-2 py-2 text-sm`}
                  >
                    <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      void (async () => {
                        await signOut().catch((e) => console.error(e));
                      })()
                    }
                    className={`${
                      active ? "bg-cyan-600 text-white" : "text-gray-900"
                    } group flex w-full items-center  px-2 py-2 text-sm`}
                  >
                    <UserMinusIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
