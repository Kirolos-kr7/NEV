<template>
  <Navbar />
  <div class="">
    <div
      class="w-full min-h-screen sm:w-8/12 pt-20 sm:pt-24 bg-white dark:bg-dark2 p-5 mx-auto relative pb-18"
    >
      <div v-if="editor" class="flex flex-wrap">
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66667 5.83333H5.41667C5.9692 5.83333 6.4991 5.61384 6.88981 5.22314C7.28051 4.83244 7.5 4.30253 7.5 3.75C7.5 3.19747 7.28051 2.66756 6.88981 2.27686C6.4991 1.88616 5.9692 1.66667 5.41667 1.66667H1.66667V5.83333ZM10 9.58333C10 10.0758 9.903 10.5634 9.71455 11.0184C9.52609 11.4734 9.24987 11.8868 8.90165 12.235C8.55343 12.5832 8.14003 12.8594 7.68506 13.0479C7.23009 13.2363 6.74246 13.3333 6.25 13.3333H0V0H5.41667C6.1508 3.07626e-05 6.86877 0.215544 7.48156 0.619815C8.09435 1.02409 8.575 1.59933 8.86391 2.27422C9.15282 2.94912 9.23728 3.69397 9.10682 4.41641C8.97636 5.13886 8.63671 5.80712 8.13 6.33833C8.69887 6.66775 9.17111 7.14098 9.49934 7.71054C9.82756 8.2801 10.0002 8.92597 10 9.58333ZM1.66667 7.5V11.6667H6.25C6.80253 11.6667 7.33244 11.4472 7.72314 11.0565C8.11384 10.6658 8.33333 10.1359 8.33333 9.58333C8.33333 9.0308 8.11384 8.50089 7.72314 8.11019C7.33244 7.71949 6.80253 7.5 6.25 7.5H1.66667Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4 12.8H0V11.2H2.3416L4.0344 1.6H1.6V0H8V1.6H5.6584L3.9656 11.2H6.4V12.8Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0087 7.77778C11.1876 8.17911 11.2778 8.62556 11.2778 9.11556C11.2778 10.1593 10.8702 10.976 10.0559 11.5632C9.24 12.1504 8.11456 12.4444 6.678 12.4444C5.40244 12.4444 4.14011 12.1481 2.89022 11.5547V9.8C4.07244 10.4821 5.28189 10.8236 6.51933 10.8236C8.50344 10.8236 9.49822 10.2542 9.50522 9.11478C9.50932 8.88375 9.46681 8.65427 9.38021 8.44005C9.29361 8.22584 9.16472 8.03127 9.00122 7.868L8.90789 7.777H0V6.22144H14V7.777H11.0087V7.77778ZM7.83689 5.44444H3.60033C3.46409 5.32022 3.33891 5.18437 3.22622 5.03844C2.89022 4.60444 2.72222 4.08022 2.72222 3.46267C2.72222 2.50133 3.08467 1.68389 3.80878 1.01033C4.53444 0.336778 5.65522 0 7.17267 0C8.31678 0 9.41189 0.255111 10.4564 0.765334V2.43911C9.52311 1.90478 8.50033 1.638 7.38733 1.638C5.45844 1.638 4.49478 2.24622 4.49478 3.46267C4.49478 3.78933 4.66433 4.074 5.00344 4.31744C5.34256 4.56089 5.761 4.75456 6.258 4.90078C6.74022 5.04078 7.26678 5.22278 7.83689 5.44444V5.44444Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9376 1.1248L14.0624 0L18 3.9376L14.0624 7.8752L12.9376 6.7504L15.7496 3.9376L12.9376 1.1248ZM5.0624 1.1248L2.2504 3.9376L5.0624 6.7504L3.9376 7.8752L0 3.9376L3.9376 0L5.0624 1.1248V1.1248Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().clearNodes().run()"
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4727 14.5606H11.6925L17.2774 8.97541C17.7431 8.50973 17.9995 7.89063 17.9995 7.23209C17.9995 6.57361 17.7431 5.95447 17.2774 5.48879L12.8943 1.10572C11.9331 0.144446 10.369 0.144446 9.40771 1.10572L0.72218 9.79132C0.256465 10.257 0 10.8761 0 11.5346C0 12.1931 0.256465 12.8123 0.72218 13.2779L2.9051 15.4609C3.004 15.5598 3.13812 15.6153 3.27797 15.6153H17.4727C17.7639 15.6153 18 15.3792 18 15.088C18 14.7968 17.7639 14.5606 17.4727 14.5606ZM8.29445 3.71052L9.68231 5.09838L5.429 9.35176L4.04114 7.9639L8.29445 3.71052ZM12.539 7.95504L8.28562 12.2084L6.17474 10.0975L10.4281 5.84415L12.539 7.95504ZM13.2847 8.70081L14.6726 10.0887L13.2499 11.5115L10.4193 14.3421L9.03139 12.9541L13.2847 8.70081ZM10.1535 1.85149C10.7036 1.30147 11.5985 1.30147 12.1486 1.85149L16.5317 6.23456C17.0817 6.78462 17.0817 7.67963 16.5317 8.22965L15.4184 9.34294L9.04022 2.96475L10.1535 1.85149ZM1.46791 12.5322C1.20143 12.2657 1.05469 11.9114 1.05469 11.5346C1.05469 11.1578 1.20143 10.8036 1.46788 10.5371L3.29534 8.70967L5.05603 10.4704L5.05607 10.4704L7.91269 13.3271C7.91279 13.3272 7.9129 13.3272 7.913 13.3273L9.14629 14.5606H3.49639L1.46791 12.5322Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1.75V14.875H5.25V10.5C3.85761 10.5 2.52226 9.94688 1.53769 8.96231C0.553124 7.97774 0 6.64239 0 5.25C0 3.85761 0.553124 2.52226 1.53769 1.53769C2.52226 0.553124 3.85761 0 5.25 0H14V1.75H11.375V14.875H9.625V1.75H7ZM5.25 1.75C4.32174 1.75 3.4315 2.11875 2.77513 2.77513C2.11875 3.4315 1.75 4.32174 1.75 5.25C1.75 6.17826 2.11875 7.0685 2.77513 7.72487C3.4315 8.38125 4.32174 8.75 5.25 8.75V1.75Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H3
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          H4
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          H5
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          H6
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.58333 0.458333H16.5V2.29167H4.58333V0.458333ZM1.375 2.75C1.01033 2.75 0.660591 2.60513 0.402728 2.34727C0.144866 2.08941 0 1.73967 0 1.375C0 1.01033 0.144866 0.660591 0.402728 0.402728C0.660591 0.144866 1.01033 0 1.375 0C1.73967 0 2.08941 0.144866 2.34727 0.402728C2.60513 0.660591 2.75 1.01033 2.75 1.375C2.75 1.73967 2.60513 2.08941 2.34727 2.34727C2.08941 2.60513 1.73967 2.75 1.375 2.75ZM1.375 9.16667C1.01033 9.16667 0.660591 9.0218 0.402728 8.76394C0.144866 8.50608 0 8.15634 0 7.79167C0 7.42699 0.144866 7.07726 0.402728 6.81939C0.660591 6.56153 1.01033 6.41667 1.375 6.41667C1.73967 6.41667 2.08941 6.56153 2.34727 6.81939C2.60513 7.07726 2.75 7.42699 2.75 7.79167C2.75 8.15634 2.60513 8.50608 2.34727 8.76394C2.08941 9.0218 1.73967 9.16667 1.375 9.16667ZM1.375 15.4917C1.01033 15.4917 0.660591 15.3468 0.402728 15.0889C0.144866 14.8311 0 14.4813 0 14.1167C0 13.752 0.144866 13.4023 0.402728 13.1444C0.660591 12.8865 1.01033 12.7417 1.375 12.7417C1.73967 12.7417 2.08941 12.8865 2.34727 13.1444C2.60513 13.4023 2.75 13.752 2.75 14.1167C2.75 14.4813 2.60513 14.8311 2.34727 15.0889C2.08941 15.3468 1.73967 15.4917 1.375 15.4917ZM4.58333 6.875H16.5V8.70833H4.58333V6.875ZM4.58333 13.2917H16.5V15.125H4.58333V13.2917Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.44444 0.888889H16V2.66667H4.44444V0.888889ZM1.77778 0V2.66667H2.66667V3.55556H0V2.66667H0.888889V0.888889H0V0H1.77778ZM0 9.77778V7.55556H1.77778V7.11111H0V6.22222H2.66667V8.44444H0.888889V8.88889H2.66667V9.77778H0ZM1.77778 14.6667H0V13.7778H1.77778V13.3333H0V12.4444H2.66667V16H0V15.1111H1.77778V14.6667ZM4.44444 7.11111H16V8.88889H4.44444V7.11111ZM4.44444 13.3333H16V15.1111H4.44444V13.3333Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.95 0H18.05C18.302 0 18.5436 0.100089 18.7218 0.278249C18.8999 0.456408 19 0.698044 19 0.95V16.15C19 16.402 18.8999 16.6436 18.7218 16.8218C18.5436 16.9999 18.302 17.1 18.05 17.1H0.95C0.698044 17.1 0.456408 16.9999 0.278249 16.8218C0.100089 16.6436 0 16.402 0 16.15V0.95C0 0.698044 0.100089 0.456408 0.278249 0.278249C0.456408 0.100089 0.698044 0 0.95 0V0ZM1.9 1.9V15.2H17.1V1.9H1.9ZM17.1 8.55L13.7408 11.9092L12.3975 10.565L14.4134 8.55L12.3975 6.53505L13.7408 5.1908L17.1 8.55ZM4.5866 8.55L6.6025 10.565L5.2592 11.9092L1.9 8.55L5.2592 5.1908L6.6025 6.536L4.5866 8.55ZM8.7818 13.3H6.7602L10.2182 3.8H12.2398L8.7818 13.3Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.42045 11.2146C0.496215 10.233 0 9.13196 0 7.3472C0 4.20661 2.2047 1.39173 5.4108 0L6.2121 1.2365C3.21956 2.85525 2.63451 4.95586 2.40121 6.2803C2.88307 6.03084 3.51388 5.94381 4.13213 6.00123C5.75088 6.15108 7.02686 7.48001 7.02686 9.13196C7.02686 9.9649 6.69598 10.7637 6.107 11.3527C5.51803 11.9417 4.7192 12.2726 3.88627 12.2726C2.92345 12.2726 2.0028 11.8329 1.42045 11.2146V11.2146ZM10.3936 11.2146C9.46935 10.233 8.97314 9.13196 8.97314 7.3472C8.97314 4.20661 11.1778 1.39173 14.3839 0L15.1852 1.2365C12.1927 2.85525 11.6076 4.95586 11.3743 6.2803C11.8562 6.03084 12.487 5.94381 13.1053 6.00123C14.724 6.15108 16 7.48001 16 9.13196C16 9.9649 15.6691 10.7637 15.0801 11.3527C14.4912 11.9417 13.6923 12.2726 12.8594 12.2726C11.8966 12.2726 10.9759 11.8329 10.3936 11.2146V11.2146Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setHorizontalRule().run()"
        >
          <svg
            width="18"
            height="2"
            viewBox="0 0 18 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H1.8V1.8H0V0ZM3.6 0H14.4V1.8H3.6V0ZM16.2 0H18V1.8H16.2V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setHardBreak().run()"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6667 12.4444H12C12.5894 12.4444 13.1546 12.2103 13.5713 11.7936C13.9881 11.3768 14.2222 10.8116 14.2222 10.2222C14.2222 9.63285 13.9881 9.06762 13.5713 8.65087C13.1546 8.23413 12.5894 8 12 8H0V6.22222H12C13.0609 6.22222 14.0783 6.64365 14.8284 7.3938C15.5786 8.14394 16 9.16136 16 10.2222C16 11.2831 15.5786 12.3005 14.8284 13.0506C14.0783 13.8008 13.0609 14.2222 12 14.2222H10.6667V16L7.11111 13.3333L10.6667 10.6667V12.4444ZM0 0H16V1.77778H0V0ZM5.33333 12.4444V14.2222H0V12.4444H5.33333Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="btn-action" @click="editor.chain().focus().undo().run()">
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.42505 5.37367L5.69411 7.64272L4.42895 8.90788L0 4.47893L4.42895 0.0499878L5.69411 1.31515L3.42505 3.5842H9.84211C11.7405 3.5842 13.5611 4.33833 14.9035 5.6807C16.2459 7.02306 17 8.8437 17 10.7421C17 12.6405 16.2459 14.4611 14.9035 15.8035C13.5611 17.1459 11.7405 17.9 9.84211 17.9H1.78947V16.1105H9.84211C11.2659 16.1105 12.6314 15.5449 13.6382 14.5381C14.6449 13.5314 15.2105 12.1659 15.2105 10.7421C15.2105 9.3183 14.6449 7.95282 13.6382 6.94605C12.6314 5.93927 11.2659 5.37367 9.84211 5.37367H3.42505Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="btn-action" @click="editor.chain().focus().redo().run()">
          <svg
            width="17"
            height="18"
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5749 5.37367H7.15789C5.7341 5.37367 4.36862 5.93927 3.36185 6.94605C2.35507 7.95282 1.78947 9.3183 1.78947 10.7421C1.78947 12.1659 2.35507 13.5314 3.36185 14.5381C4.36862 15.5449 5.7341 16.1105 7.15789 16.1105H15.2105V17.9H7.15789C5.2595 17.9 3.43886 17.1459 2.0965 15.8035C0.754133 14.4611 0 12.6405 0 10.7421C0 8.8437 0.754133 7.02306 2.0965 5.6807C3.43886 4.33833 5.2595 3.5842 7.15789 3.5842H13.5749L11.3059 1.31515L12.5711 0.0499878L17 4.47893L12.5711 8.90788L11.3059 7.64272L13.5749 5.37367Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.442017 0H1.57382V19H0.442017V0Z" fill="currentColor" />
            <path d="M3 3H16V6H3V3Z" fill="currentColor" />
            <path
              d="M3.03979 7.79321H18.442V10.7932H3.03979V7.79321Z"
              fill="currentColor"
            />
            <path
              d="M3.03979 12.9888H13.2122V15.9888H3.03979V12.9888Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0H15V3H1V0Z" fill="currentColor" />
            <path d="M0 4.79321H16V7.79321H0V4.79321Z" fill="currentColor" />
            <path d="M3 10H13V13H3V10Z" fill="currentColor" />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.442 0H16.3102V19H17.442V0Z" fill="currentColor" />
            <path d="M14.884 3H1.88403V6H14.884V3Z" fill="currentColor" />
            <path
              d="M14.8442 7.79321H-0.558016V10.7932H14.8442V7.79321Z"
              fill="currentColor"
            />
            <path
              d="M14.8442 12.9888H4.67181V15.9888H14.8442V12.9888Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="setLink"
          :class="{ 'is-active': editor.isActive('link') }"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.979 13.0198C5.12259 13.1634 5.3109 13.2351 5.49911 13.2351C5.68732 13.2351 5.87563 13.1634 6.01922 13.0198L13.0183 6.02071C13.3055 5.73334 13.3055 5.26767 13.0183 4.98039C12.7309 4.69322 12.2652 4.69322 11.978 4.98039L4.979 11.9795C4.69173 12.2667 4.69173 12.7324 4.979 13.0198Z"
              fill="currentColor"
            />
            <path
              d="M16.5179 1.48088C15.563 0.525895 14.2935 0 12.943 0C11.5925 9.80782e-05 10.323 0.525993 9.36811 1.48088L6.95117 3.89773C6.6639 4.1851 6.6639 4.65077 6.95117 4.93814C7.23834 5.22521 7.70412 5.22541 7.99139 4.93814L10.4084 2.5211C11.0855 1.84416 11.9855 1.47117 12.9431 1.47117C13.9005 1.47117 14.8006 1.84407 15.4776 2.5211C16.1546 3.19804 16.5275 4.0983 16.5275 5.05574C16.5275 6.01318 16.1546 6.91324 15.4776 7.59027L13.0607 10.0072C12.7734 10.2946 12.7734 10.7603 13.0607 11.0475C13.2043 11.1911 13.3926 11.2629 13.5809 11.2629C13.7691 11.2629 13.9574 11.1911 14.1011 11.0475L16.5179 8.63059C17.4728 7.6757 17.9988 6.40608 17.9988 5.05574C17.9987 3.7053 17.4729 2.43567 16.5179 1.48088Z"
              fill="currentColor"
            />
            <path
              d="M10.006 13.062L7.58909 15.4791C6.91206 16.156 6.0119 16.5289 5.05455 16.5289C4.09711 16.5289 3.19705 16.1561 2.52002 15.4791C1.1224 14.0816 1.1224 11.8074 2.52002 10.4098L4.93696 7.99288C5.22423 7.70551 5.22423 7.23983 4.93696 6.95256C4.64969 6.66539 4.18391 6.66539 3.89664 6.95256L1.4796 9.3695C-0.491573 11.3408 -0.491573 14.5481 1.4796 16.5193C2.43449 17.4741 3.70402 18.0001 5.05446 18C6.40489 18 7.67442 17.4741 8.62931 16.5192L11.0464 14.1022C11.3337 13.8148 11.3337 13.3491 11.0464 13.0619C10.7591 12.7749 10.2934 12.7747 10.006 13.062Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div
          class="btn-action"
          @click="editor.chain().focus().unsetLink().run()"
          v-if="editor.isActive('link')"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1798 16.5356C11.1798 16.6554 11.2285 16.764 11.307 16.8426C11.3856 16.9211 11.4942 16.9698 11.614 16.9698L17.457 16.9697C17.6968 16.9697 17.8912 16.7753 17.8912 16.5355C17.8911 16.2957 17.6968 16.1013 17.457 16.1013L11.6141 16.1013C11.3742 16.1013 11.1799 16.2957 11.1798 16.5356Z"
              fill="currentColor"
            />
            <path
              d="M4.97778 13.0198C5.12137 13.1634 5.30968 13.2351 5.49789 13.2351C5.6861 13.2351 5.87441 13.1634 6.018 13.0198L13.0171 6.02071C13.3043 5.73334 13.3043 5.26767 13.0171 4.98039C12.7297 4.69322 12.264 4.69322 11.9767 4.98039L4.97778 11.9795C4.69051 12.2667 4.69051 12.7324 4.97778 13.0198Z"
              fill="currentColor"
            />
            <path
              d="M16.5167 1.48088C15.5618 0.525895 14.2923 0 12.9417 0C11.5913 9.80782e-05 10.3218 0.525994 9.36689 1.48088L6.94995 3.89773C6.66268 4.1851 6.66268 4.65077 6.94995 4.93814C7.23712 5.22521 7.7029 5.22541 7.99017 4.93814L10.4072 2.5211C11.0842 1.84416 11.9843 1.47117 12.9418 1.47117C13.8993 1.47117 14.7993 1.84407 15.4764 2.5211C16.1534 3.19804 16.5263 4.0983 16.5263 5.05574C16.5263 6.01318 16.1534 6.91324 15.4764 7.59027L13.0594 10.0072C12.7722 10.2946 12.7722 10.7603 13.0594 11.0475C13.2031 11.1911 13.3914 11.2629 13.5796 11.2629C13.7679 11.2629 13.9562 11.1911 14.0998 11.0475L16.5167 8.63059C17.4716 7.6757 17.9976 6.40608 17.9976 5.05574C17.9975 3.7053 17.4717 2.43567 16.5167 1.48088Z"
              fill="currentColor"
            />
            <path
              d="M10.0048 13.062L7.58787 15.4791C6.91084 16.156 6.01067 16.5289 5.05333 16.5289C4.09589 16.5289 3.19583 16.1561 2.5188 15.4791C1.12118 14.0816 1.12118 11.8074 2.5188 10.4098L4.93574 7.99288C5.22301 7.70551 5.22301 7.23983 4.93574 6.95256C4.64847 6.66539 4.18269 6.66539 3.89542 6.95256L1.47838 9.3695C-0.492794 11.3408 -0.492794 14.5481 1.47838 16.5193C2.43327 17.4741 3.7028 18.0001 5.05324 18C6.40367 18 7.6732 17.4741 8.62809 16.5192L11.0452 14.1022C11.3325 13.8148 11.3325 13.3491 11.0452 13.0619C10.7579 12.7749 10.2922 12.7747 10.0048 13.062Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div class="editingSpace mx-2">
        <span
          type="text"
          class="postTitle dark:text-white w-full border-none outline-none font-black text-5xl cursor-text resize-none leading-normal block"
          contenteditable
        ></span>
        <editor-content :editor="editor" class="mt-5 dark:text-white" />
      </div>
      <button
        class="btn-medium text-black mt-3 ml-auto absolute bottom-3 right-6"
        @click.prevent="nextStep.dialog = true"
      >
        Next Step
      </button>
    </div>
  </div>

  <div
    class="edit fixed w-full h-screen top-0 left-0 flex justify-center items-center overflow-hidden z-50"
    v-if="nextStep.dialog"
  >
    <div class="bgBlur absolute bg-black bg-opacity-50 w-full h-full z-0"></div>
    <div
      class="wrapper bg-white dark:bg-dark2 z-10 w-11/12 max-w-prose !max-h-[80vh] overflow-y-auto rounded-md p-5 sm:p-7 pt-4 pb-4"
    >
      <div class="flex justify-between items-center mb-5">
        <h2 class="dark:text-white font-BioRhyme font-normal text-xl">
          Final Touches
          <Colors />
        </h2>
        <button
          class="w-8 h-8 felx items-center justify-center cursor-pointer p-1 pb-0 dark:hover:bg-dark1 hover:bg-gray-100 dark:text-white rounded-md focus:ring-2 ring-indigo-700/75 transition"
          @click="nextStep.dialog = false"
        >
          <svg
            class="mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div>
        <label
          for="ta"
          class="text-lg dark:text-white font-medium mb-1 block font-BioRhyme"
          >Short Description
          <span class="text-specialGray text-xs">[optional]</span></label
        >
        <textarea
          class="w-full h-28 p-2 text-lg rounded-md mx-auto block resize-none textarea border-gray-400 dark:border-dark1 border-solid border bg-gray-100 dark:bg-dark4 dark:text-white mb-3"
          placeholder="Short Description"
          v-model="description"
          id="ta"
        ></textarea>
      </div>
      <div>
        <label
          for="postImage"
          class="text-lg dark:text-white font-medium mb-1 block font-BioRhyme"
          >Post Image
          <span class="text-specialGray text-xs">[optional]</span></label
        >
        <input
          type="file"
          class="hidden"
          @change="imageChange"
          accept="image/*"
          ref="postImage"
        />
        <button
          class="w-full border-gray-400 dark:border-dark1 rounded-md border-solid border bg-gray-100 dark:bg-dark4 dark:text-white text-center p-4 cursor-pointer focus:ring focus:ring-indigo-700/75"
          @click="addImage"
          v-if="!isPostImage"
        >
          <svg
            class="w-8 h-8 text-dark4 dark:text-gray-100 mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="dark:text-gray-300">CLICK TO ADD IMAGE</p>
        </button>
        <div
          class="flex justify-between items-center gap-x-2 border-gray-400 dark:border-dark1 rounded-md border-solid border bg-gray-100 dark:bg-dark4 dark:text-white text-center p-4 relative"
          v-else
        >
          <div class="flex flex-col items-baseline gap-y-1 w-10/12 sm:w-3/4">
            <span
              class="inline-block bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm overflow-hidden overflow-ellipsis max-w-full"
              >{{ postImage?.files[0].name }}</span
            >
            <span
              class="inline-block sm:hidden bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm whitespace-nowrap"
              >{{ getImageSize() }}</span
            >
          </div>
          <div class="flex items-center gap-x-2">
            <span
              class="hidden sm:inline-block bg-gray-300 dark:bg-dark1 rounded-full pt-1 pb-1.5 px-3 text-sm whitespace-nowrap"
              >{{ getImageSize() }}</span
            >
            <span
              class="cursor-pointer p-1 pb-0 dark:hover:bg-dark1 dark:text-white rounded-md"
              @click="removeImage"
              ><svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path></svg
            ></span>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <label
          for="select"
          class="text-lg dark:text-white font-medium mb-1 block font-BioRhyme"
        >
          Post Tags <span class="text-specialGray text-xs">[0 to 4]</span>
        </label>
        <div class="relative">
          <select
            id="select"
            class="postSelect appearance-none w-full mb-0 p-2 text-lg rounded-md mx-auto block resize-none textarea border-gray-400 dark:border-dark1 border-solid border bg-gray-100 dark:bg-dark4 dark:text-white"
            :class="tags.length > 0 ? 'rounded-br-none rounded-bl-none' : ''"
            value=""
            @change="addTag()"
          >
            <option value=""></option>
            <option v-for="tag in whitelist" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
          <svg
            class="w-6 h-6 absolute top-3 right-3 pointer-events-none chev-down dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
          <div
            v-if="tags.length > 0"
            class="tags-container w-full mb-0 p-1 pt-0.5 text-lg rounded-md mx-auto border-solid border bg-gray-100 dark:border-dark1 dark:bg-dark4 dark:text-white flex flex-wrap border-t-0 rounded-tr-none rounded-tl-none mt-1"
          >
            <div v-for="tag in tags" :key="tag">
              <div
                class="px-3 pt-0.5 pb-1 bg-gray-300 dark:bg-dark1 rounded-full m-1 flex items-center justify-center"
              >
                {{ tag }}
                <button
                  class="w-4 h-4 bg-gray-200 dark:bg-dark4 rounded-full p-0.5 ml-2 mt-1 cursor-pointer focus:ring-2 focus:ring-indigo-700/75"
                  @click="removeTag(tag)"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn-medium ml-auto mt-4 cursor-pointer"
        @click="postNewPost"
      >
        Post Now
      </button>
    </div>
  </div>

  <div
    class="fixed w-full h-screen top-0 left-0 flex justify-center items-center overflow-hidden z-50"
    v-if="loading"
  >
    <div class="bgBlur absolute bg-black bg-opacity-80 w-full h-full z-0"></div>
    <div
      class="wrapper z-10 bg-transparent w-11/12 max-w-prose rounded-md p-9 pt-5 pb-4"
    >
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { db, storage, timestamp } from '../firebase'
import { store } from '../store'
import { useEditor, EditorContent, VueNodeViewRenderer } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockComponent from '../components/CodeBlockComponent.vue'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'
import Navbar from '../components/Navbar.vue'
import Loading from '../components/Loading.vue'
import Colors from '../components/Colors.vue'

let description = ref(''),
  tags = ref([]),
  whitelist = ref([
    'angular',
    'asp.net',
    'assemblylanguage',
    'beta',
    'c#',
    'c++',
    'css',
    'design',
    'expressjs',
    'firebase',
    'flutterdev',
    'html',
    'java',
    'javascript',
    'laravel',
    'machinecode',
    'mathematics',
    'matlap',
    'php',
    'python',
    'react',
    'ui-ux',
    'vite',
    'vuejs',
    'webdev',
  ]),
  nextStep = ref({
    dialog: true,
  }),
  postImage = ref(),
  isPostImage = ref(false),
  loading = ref(false),
  router = useRouter()

let user = computed(() => {
  return store.state.user
})

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Placeholder,
    TextAlign,
    Link,
    CodeBlockLowlight.extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlockComponent)
      },
    }).configure({ lowlight }),
  ],
})

const setLink = () => {
  const url = window.prompt('URL')
  editor.value.chain().focus().setLink({ href: url }).run()
}

const postNewPost = () => {
  let postTitle = document.querySelector('.postTitle').textContent
  let slug = postTitle
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')

  db.collection('posts')
    .where('slug', '==', slug)
    .get()
    .then((res) => {
      if (res.docs.length == 0) {
        if (
          postImage.value.files[0] != undefined ||
          postImage.value.files[0] != null
        ) {
          loading.value = true
          storage
            .ref('posts/' + uuidv4())
            .put(postImage.value.files[0])
            .then((data) => {
              data.ref.getDownloadURL().then((url) => {
                go(url)
              })
            })
        } else {
          loading.value = true
          go(null)
        }
      } else {
        alert('Title Already Exists')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const go = (imageURL) => {
  let postTitle = document.querySelector('.postTitle').textContent
  let slug = postTitle
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
  db.collection('users')
    .doc(user.value.email)
    .get()
    .then((res) => {
      db.collection('posts')
        .doc()
        .set({
          by: user.value.displayName,
          byFullName: res.data().fullName,
          byImage: user.value.photoURL,
          image: imageURL,
          content: editor.value.getHTML(),
          createdAt: timestamp(),
          likes: [],
          likes_count: 0,
          tags: [],
          title: postTitle,
          description: description.value,
          tags: tags.value,
          slug: slug
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, ''),
        })
        .then(() => {
          loading.value = false
          postImage.value.value = ''
          editor.value.commands.clearContent(true)
          document.querySelector('.postTitle').textContent = ''
          description.value = ''
          router.push('/p/' + slug)
        })
    })
}

const addTag = () => {
  let tag = document.querySelector('.postSelect').value
  if (tags.value.length < 4) {
    tags.value.push(tag)
  }
  whitelist.value.splice(whitelist.value.indexOf(tag), 1)
}

const removeTag = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1)
  whitelist.value.push(tag)
  whitelist.value.sort()
}

const addImage = () => {
  postImage.value.click()
}

const imageChange = () => {
  isPostImage.value = !isPostImage.value
}

const removeImage = () => {
  postImage.value.files = null
  isPostImage.value = false
}

const getImageSize = () => {
  let size =
    postImage.value.files[0].size / 1024 > 1024
      ? (postImage.value.files[0].size / 1024 / 1024).toFixed(2) + ' mb'
      : postImage.value.files[0].size > 1024
      ? (postImage.value.files[0].size / 1024).toFixed(2) + ' kb'
      : postImage.value.files[0].size.toFixed(2) + ' bytes'
  return size
}
</script>

<style>
.ProseMirror {
  outline: none;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

.btn-action.is-active {
  background: crimson !important;
}

.postTitle:empty::after {
  content: 'New post title here...  ';
  color: gray;
}
</style>
