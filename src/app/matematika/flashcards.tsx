<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winston Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#fdf6ed] text-gray-900">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="flex flex-col h-screen w-64 bg-[#fdf6ed] border-r border-[#e8e0d5]">
            <!-- Logo and Brand -->
            <div class="p-4 border-b border-[#e8e0d5]">
              <div class="flex items-center gap-2">
                <div class="text-[#f0a030] font-bold">
                  <img
                    src="/winston_logo.png"
                    alt="Winston logo"
                    width="50"
                    height="50"
                    class="object-cover"
                  />
                </div>
                <span class="text-xl font-bold">Winston</span>
              </div>
            </div>
          
            <!-- Menu Section -->
            <div class="flex-1 overflow-y-auto">
              <div class="p-4">
                <p class="text-sm font-medium mb-2">Menu</p>
                <nav class="space-y-1">
                  <a
                    href="/"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Layers --></svg>
                    <span>Home</span>
                  </a>
          
                  <a
                    href="/winston-ai/"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <div class="w-5 h-5 flex items-center justify-center">
                      <img
                        src="/winston_logo_mono.png"
                        alt="Winston logo"
                        width="36"
                        height="36"
                        class="object-cover"
                      />
                    </div>
                    <span>Winston AI</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Book --></svg>
                    <span>Informasi</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for BookOpen --></svg>
                    <span>Membaca</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Calculator --></svg>
                    <span>Belajar Matematika</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for PenTool --></svg>
                    <span>Menulis</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Brain --></svg>
                    <span>Berpikir Kritis</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Layers --></svg>
                    <span>Referensi Materi</span>
                  </a>
                </nav>
              </div>
          
              <!-- General Section -->
              <div class="p-4">
                <p class="text-sm font-medium mb-2">General</p>
                <nav class="space-y-1">
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for HelpCircle --></svg>
                    <span>Help and Support</span>
                  </a>
          
                  <a
                    href="#"
                    class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-[#f0e6d9]"
                  >
                    <svg class="w-5 h-5"><!-- Icon for Settings --></svg>
                    <span>Setting</span>
                  </a>
                </nav>
              </div>
            </div>
          
            <!-- Logout Button -->
            <div class="p-4">
              <button class="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                <svg class="w-5 h-5"><!-- Icon for LogOut --></svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
          
        <!-- Main Content -->
        <main class="flex-1 p-6 overflow-auto">
            <!-- Updated Heading Section -->
            <div class="flex flex-col gap-4">
                <div class="flex flex-col">
                    <div class="text-2xl font-semibold">Introduksi Integral</div>
                    <div class="text-gray-600 text-lg">Kalkulus & Analisis Matematika : Latihan Soal</div>
                </div>
                <div class="flex gap-4">
                    <button class="flex items-center gap-2 px-4 py-2 bg-[#FFEBC9] border border-[#FFCE85] rounded-lg">
                        <div class="w-6 h-6 bg-black"></div>
                        <span class="text-sm font-medium">Dengarkan Penjelasan</span>
                    </button>
                    <button class="flex items-center gap-2 px-4 py-2 bg-[#FFEBC9] border border-[#FFCE85] rounded-lg">
                        <div class="w-6 h-6 bg-black"></div>
                        <span class="text-sm font-medium">Ringkasan Teks</span>
                    </button>
                </div>
            </div>
            
            <div class="mb-6"></div>

            <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-5">
                    <div class="flex items-center gap-1">
                        <div class="text-black text-base font-medium">3 hours</div>
                        <div class="w-1.5 h-1.5 bg-black rounded-full"></div>
                    </div>
                    <div class="text-black text-base font-medium">25 questions</div>
                </div>
                <div class="flex items-center gap-4">
                    <button class="flex items-center justify-center px-3 py-2 bg-[#C77F00] text-white text-sm font-normal rounded-lg">
                        Download
                    </button>
                    <button class="flex items-center justify-center px-3 py-2 bg-[#FFEBC9] text-black text-sm font-normal rounded-lg border border-[#9AA4B2]">
                        Jawaban
                    </button>
                </div>
            </div>
   


        <div class="mb-6"></div>

            <!-- Flashcard Section -->
            <div class="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-2">
                    <!-- Ellipse -->
                    <div
                      style="width: 40px; height: 40px; background: var(--primary-400, #FFC052); border-radius: 9999px; border: 0.50px #EEF2F6 solid;"
                      class="flex items-center justify-center text-black font-medium"
                    >
                      1a
                    </div>
                  </div>
                  <div class="flex items-center gap-2 text-black font-medium">
                    <svg
                      class="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 2v20m10-10H2"
                      />
                    </svg>
                    <span>2 marks</span>
                  </div>
                </div>
              
                <hr class="my-2 border-gray-500" />
              
                <div class="text-black font-medium mb-4">Tunjukan bahwa:</div>
              
                <div class="flex justify-center">
                    <img
                      style="width: 322px; height: 92px; position: relative"
                      src="https://placehold.co/322x92"
                      alt="Soal"
                    />
                </div>
              
                <div class="mt-4">
                  <p class="text-black font-medium">Bagaimana pengerjaanmu?</p>
                  <div class="flex gap-4 mt-2">
                    <!-- First Ellipse -->
                 <!-- Button with Check Icon -->
      <button
        class="p-2 bg-yellow-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
      >
        <img src="/path-to-icons/check.png" alt="Check Icon" class="w-4 h-4" />
      </button>

      <!-- Button with No (Wrong) Icon -->
      <button
        class="p-2 bg-red-400 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
      >
        <img src="/path-to-icons/no(wrong).png" alt="Wrong Icon" class="w-4 h-4" />
      </button>

      <!-- Button with Flag Icon -->
      <button
        class="p-2 bg-yellow-600 rounded-full shadow w-[40px] h-[40px] border border-[#EEF2F6] flex items-center justify-center"
      >
        <img src="/path-to-icons/flag.png" alt="Flag Icon" class="w-4 h-4" />
      </button>
    </div>
  </div>

  <div class="mt-4 flex justify-end">
    <button class="px-4 py-2 bg-[#FFC052] text-black font-medium rounded-md shadow">
      Lihat Jawaban
    </button>
  </div>
</div>
                   
              <div class="mb-6"></div>
              <!-- Flashcard Section -->
         <div class="w-full p-4 bg-[#FEF1D5] border border-gray-500 rounded-lg shadow-sm">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <!-- Ellipse -->
                <div
                  style="width: 40px; height: 40px; background: var(--primary-400, #FFC052); border-radius: 9999px; border: 0.50px #EEF2F6 solid;"
                  class="flex items-center justify-center text-black font-medium"
                >
                  1a
                </div>
              </div>
              <div class="flex items-center gap-2 text-black font-medium">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 2v20m10-10H2"
                  />
                </svg>
                <span>2 marks</span>
              </div>
            </div>
          
            <hr class="my-2 border-gray-500" />
          
            <div class="text-black font-medium mb-4">Tunjukan bahwa:</div>
          
            <div class="flex justify-center">
                <img
                  style="width: 322px; height: 92px; position: relative"
                  src="https://placehold.co/322x92"
                  alt="Soal"
                />
            </div>
          
            <div class="mt-4">
              <p class="text-black font-medium">Bagaimana pengerjaanmu?</p>
              <div class="flex gap-4 mt-2">
                <!-- First Ellipse -->
                <button
                  class="p-2 bg-yellow-400 rounded-full shadow"
                  style="width: 40px; height: 40px; border-radius: 9999px; border: 0.50px #EEF2F6 solid;"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
          
                <!-- Second Ellipse -->
                <button
                  class="p-2 bg-red-400 rounded-full shadow"
                  style="width: 40px; height: 40px; border-radius: 9999px; border: 0.50px #EEF2F6 solid;"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
          
                <!-- Third Ellipse (Flag Icon) -->
                <button
                  class="p-2 bg-yellow-600 rounded-full shadow"
                  style="width: 40px; height: 40px; border-radius: 9999px; border: 0.50px #EEF2F6 solid;"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 2v20m10-10H2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          
            <div class="mt-4 flex justify-end">
              <button class="px-4 py-2 bg-[#FFC052] text-black font-medium rounded-md shadow">
                Lihat Jawaban
              </button>
            </div>
          </div>
    </main>
</div>
</body>
</html>
