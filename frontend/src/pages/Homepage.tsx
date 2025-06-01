import ThemeSwitcher from "../components/ThemeSwitcher";
import { useGetMeQuery } from "../features/auth/authApi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdLogin } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import GridSection from "../components/Homepage/GridSection";

function Homepage() {
  const { data: me } = useGetMeQuery();

  return (
    <>
      <title>IlMotoDiario</title>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]"></div>
      <div className="w-full min-w-screen py-8 px-4 flex justify-end align-center">
        <ThemeSwitcher />
      </div>
      <div className="w-wull min-w-screen">
        <div className="w-full mx-auto  max-w-2xl flex flex-col items-center pt-8 sm:mb-16 p-4">
          <div className="mb-6 flex">
            <a
              href=""
              target="_blank"
              className="text-xs text-gray-900 font-inter inline-flex border-solid rounded-full px-3 py-1 border border-gray-900 no-underline dark:text-white dark:border-white"
            >
              Scopri le Novità ⚡️
              <span className="font-inter font-semibold inline-flex items-center pl-2 text-black dark:text-white">
                Vai <IoIosArrowRoundForward />
              </span>
            </a>
          </div>
          <h1 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl font-inter">
            Organizza e conserva i
            <br />
            <span className="font-inter animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              tuoi itinerari su due ruote
            </span>
          </h1>
          <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-inter">
            Raccogli, organizza e condividi i tuoi viaggi su due ruote. Mappe,
            ricordi e percorsi, sempre con te.
          </p>
          <div className="mt-6 gap-4 flex justify-center">
            {me ? (
              <>
                <a
                  href="/admin/login"
                  className="font-inter flex justify-center items-center bg-gray-900 rounded text-white px-4 py-3 text-sm no-underline hover:bg-gray-600 duration-500"
                >
                  Dashboard <LuLayoutDashboard className="ml-2" />
                </a>
                <a
                  href="/me"
                  className="font-inter flex justify-center items-center bg-gray-200 rounded text-gray-600 px-4 py-3 text-sm no-underline hover:bg-gray-100 duration-500"
                >
                  Area riservata <FiUser className="ml-2" />
                </a>
              </>
            ) : (
              <>
                <a
                  href="/admin/login"
                  className="font-inter flex justify-center items-center bg-gray-900 rounded text-white px-4 py-3 text-sm no-underline hover:bg-gray-600 duration-500"
                >
                  Accedi <MdLogin className="ml-2" />
                </a>
                <a
                  href="/admin/register"
                  className="font-inter flex justify-center items-center bg-gray-200 rounded text-gray-600 px-4 py-3 text-sm no-underline hover:bg-gray-100 duration-500"
                >
                  Registrati <FiUser className="ml-2" />
                </a>
              </>
            )}
          </div>
        </div>
        <div className="w-full my-20 md:my-4 md:mb-8">
          <svg
            className="w-full stroke-gray-900 dark:stroke-white"
            viewBox="0 0 9116 1884"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4704 1273.03C4686 1269.03 4688.5 1254.03 4649.5 1192.53C4644.01 1183.86 4639.42 1174.59 4635.62 1165.03M4704 1273.03C4718.4 1276.23 7650.33 1675.36 9114.5 1874.53M4704 1273.03L2 603.026M4635.62 1165.03C4617.81 1120.3 4617.03 1069.37 4619.5 1046.03C4617.83 1024.36 4620.6 968.726 4645 919.526C4669.4 870.326 4722.5 839.693 4746 830.526C4746.8 965.727 4765.33 1019.53 4774.5 1029.53C4780.1 1019.53 4781.83 986.693 4782 971.526V698.526C4789.33 729.36 4811.6 793.426 4842 803.026C4872.4 812.626 4897.67 809.693 4906.5 807.026C4963.5 850.527 4974.5 858.526 5001.5 911.026C5023.1 953.026 5015.17 1048.53 5008.5 1091.03C5000.5 1122.69 4973.1 1195.03 4927.5 1231.03C4881.9 1267.03 4833.17 1267.03 4814.5 1262.53C4796.17 1264.19 4751.1 1254.73 4717.5 1203.53C4683.9 1152.33 4681.5 1070.53 4684.5 1036.03C4684.33 1032.03 4684.1 1031.13 4684.5 1059.53C4685 1095.03 4704.5 1141.03 4711 1151.53C4717.5 1162.03 4748.5 1196.03 4796 1186.03C4843.5 1176.03 4861.5 1151.53 4890 1126.03C4918.5 1100.53 4931.5 1062.03 4933 997.526C4934.2 945.926 4915.83 904.693 4906.5 890.526C4891 856.526 4860 782.826 4860 760.026C4860 737.226 4884.67 733.86 4897 735.026C4918.5 735.36 4964.9 735.826 4978.5 735.026C4995.5 734.026 5017 726.526 5035 689.026C5049.4 659.026 5050.33 619.193 5049 603.026C5050.5 396.026 5030 413.026 5024.5 399.526C5019 386.026 5000.5 380.526 4961.5 380.526C4922.5 380.526 4875.5 403.526 4849.5 413.026C4823.5 422.526 4832 456.526 4832 472.026C4832 487.526 4847 515.526 4859.5 547.526C4872 579.526 4855 566.526 4840.5 573.526C4826 580.526 4813.45 560.026 4688.5 547.526C4563.55 535.026 4559 523.526 4511.5 515.526C4464 507.526 4484 513.026 4450 523.526C4416 534.026 4342.5 689.526 4313 720.026C4289.4 744.426 4260.5 759.86 4249 764.526C4186.33 789.526 4057.1 841.726 4041.5 850.526C4025.9 859.326 4037 871.526 4044.5 876.526C4058.17 883.026 4111.7 898.326 4216.5 907.526C4347.5 919.026 4324.5 918.526 4400 935.526C4460.4 949.126 4492.5 987.193 4501 1004.53C4516 1035.36 4547.5 1100.33 4553.5 1113.53C4559.5 1126.73 4561.67 1144.36 4562 1151.53C4543.83 1154.19 4485.2 1159.53 4396 1159.53C4284.5 1159.53 4220 1151.03 4194 1143.53C4168 1136.03 4157.5 1121.53 4156 1113.53C4154.5 1105.53 4161 1104.53 4169.5 1104.53C4178 1104.53 4177 1108.03 4178.5 1117.03C4180 1126.03 4164 1132.53 4151.5 1138.03C4139 1143.53 4006.5 1170.03 3940 1161.03C3873.5 1152.03 3830.5 1106.03 3808 1075.03C3785.5 1044.03 3759.38 979.867 3771 883.5C3784.5 771.5 3805.5 735 3874.5 683.5C3929.7 642.298 3964 640 3973 640C4019.5 640 4031 659.026 4046.5 673.026C4062 687.026 4055 694.526 4052.5 710.026C4050 725.526 3987 715.026 3955.5 720.026C3924 725.026 3871.5 745.526 3844 789.026C3816.5 832.526 3819 878.026 3815 924.026C3811 970.026 3829.5 1025.03 3838.5 1040.03C3847.5 1055.03 3879.5 1091.03 3918 1099.03C3948.8 1105.43 3989.83 1083.69 4006.5 1072.03C4020 1062.86 4050.6 1037.43 4065 1009.03C4083 973.526 4092.5 920.026 4099 900.026C4105.5 880.026 4100.5 718.526 4099 694.526C4097.5 670.526 4093 674.526 4079 633.526C4065 592.526 4072 547.526 4074.5 537.026C4077 526.526 4078 523.026 4110.5 509.026C4143 495.026 4134 499.026 4144 490.026C4152 482.826 4140.67 476.026 4134 473.526C4113.83 452.86 4069.6 405.026 4054 379.026C4034.5 346.526 4041.5 322.526 4039 311.026C4036.5 299.526 4038.5 288.526 4046 275.526C4053.5 262.526 4057.5 273.526 4069 272.526C4080.5 271.526 4146.5 307.526 4168.5 311.026C4190.5 314.526 4185 307.526 4206.5 319.026C4228 330.526 4219 336.026 4222 344.526C4224.4 351.326 4221 375.693 4219 387.026C4217 403.693 4213.3 439.026 4214.5 447.026C4216 457.026 4225.5 461.526 4240 461.526C4254.5 461.526 4259 471.026 4264 482.026C4269 493.026 4257 551.026 4256.5 563.026C4256 575.026 4238 638.026 4234.5 647.026C4231 656.026 4217 730.026 4210.5 741.026C4204 752.026 4204 821.026 4204 829.526C4204 838.026 4208.5 858.026 4222.5 869.026C4236.5 880.026 4279.5 878.026 4295.5 876.526C4311.5 875.026 4329 865.526 4338 858.026C4347 850.526 4340 835.026 4342.5 824.026C4345 813.026 4329 806.526 4325 798.026C4321 789.526 4326 763.526 4329 730.026C4332 696.527 4351 658.026 4357 638.026C4363 618.026 4379.5 582.526 4382 573.526C4384.5 564.526 4415 513.526 4438.5 482.026C4462 450.526 4473.5 453.526 4484 446.526C4494.5 439.526 4500.5 443.026 4511.5 441.526C4520.3 440.326 4534.5 444.36 4540.5 446.526L4623.5 482.026C4641.17 489.026 4681.4 503.726 4701 506.526C4725.5 510.026 4717.5 501.526 4724 498.526C4730.5 495.526 4739 424.026 4748.5 403.526C4758 383.026 4754.5 325.526 4755.5 295.026C4756.5 264.526 4744 254.526 4742.5 235.526C4741 216.526 4742 182.026 4746.5 157.526C4751 133.026 4760.5 139.026 4769.5 132.526C4778.5 126.026 4783.5 136.026 4796 143.026C4808.5 150.026 4828 169.526 4841 182.026C4854 194.526 4865 185.526 4877 189.026C4889 192.526 4917 185.526 4934.5 185.526C4952 185.526 4924.5 226.526 4921.5 235.526C4919.1 242.726 4894.83 270.526 4883 283.526C4876 291.526 4861.6 309.526 4860 317.526C4858 327.526 4862 322.526 4873 325.526C4884 328.526 4901 320.526 4917 311.526C4933 302.526 4932 290.526 4940 264.526C4946.4 243.726 4942.67 184.526 4940 157.526C4953.5 52.0264 4853.5 20.0263 4842.5 13.0263C4831.5 6.02635 4775.5 8.02635 4747 20.0263C4718.5 32.0263 4717 47.0263 4711 53.0263C4705 59.0263 4705 91.5263 4707.5 102.526C4710 113.526 4709 122.526 4707.5 129.526C4706 136.526 4687.5 137.026 4682 139.026C4676.5 141.026 4583 155.526 4539 172.526C4495 189.526 4495.5 200.026 4485.5 208.026C4475.5 216.026 4470 237.026 4452 252.526C4437.6 264.926 4427 268.36 4423.5 268.526C4412.17 272.86 4382.9 282.426 4356.5 286.026C4323.5 290.526 4341 292.526 4327 295.026C4313 297.526 4285 325.526 4273.5 341.526C4262 357.526 4266.5 362.026 4264 389.526C4261.5 417.026 4270.5 418.026 4277.5 425.026C4284.5 432.026 4297.5 426.026 4308.5 425.026C4319.5 424.026 4359 392.026 4367 383.026C4375 374.026 4427.5 341.526 4456 331.526C4484.5 321.526 4507 331.026 4523.5 331.526C4536.7 331.926 4548 338.36 4552 341.526C4566 345.693 4599.2 354.426 4620 356.026C4646 358.026 4641.5 360.026 4650 369.026C4658.5 378.026 4653 389.026 4654.5 408.026C4656 427.026 4657 419.026 4669 432.526C4681 446.026 4706.5 445.526 4746 464.526C4785.5 483.526 4771.5 482.026 4788.5 490.526C4805.5 499.026 4818.5 576.526 4817 603.026C4815.5 629.526 4802.5 629.026 4798.5 633.026C4794.5 637.026 4767 642.526 4715 640.026C4663 637.526 4632.5 618.026 4604.5 612.026C4576.5 606.026 4568 612.526 4545 618.026C4526.6 622.426 4512 648.859 4507 661.526C4496.67 682.693 4478.6 732.726 4489 763.526C4499.4 794.326 4546 790.026 4568 784.026C4598.83 779.693 4667.1 773.626 4693.5 784.026C4726.5 797.026 4678 812.026 4640 848.026C4609.6 876.826 4598.5 914.526 4594 940.026L4590 983.526L4594 1029.53C4600.5 1076.53 4612.85 1123.83 4635.62 1165.03ZM4635.62 1165.03C4654.41 1199.69 4706.21 1273.34 4649.5 1265.36C4579.5 1255.51 4599.5 1258.32 4462.38 1239.03"
              stroke-width="18"
            />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          <GridSection 
            title="🧭 Carica e visualizza i tuoi percorsi GPX"
            description="Puoi caricare file GPX per ogni viaggio e vederli rappresentati su una mappa interattiva. Ogni traccia mostra il percorso esatto che hai seguito, utile per ricordare i dettagli di un'avventura passata o condividere l’itinerario con altri appassionati."
            img="/features/img-esempio.svg"
            reverse={false}
          />
          <GridSection 
            title="📷 Aggiungi le tue foto di viaggio"
            description="Associa le immagini che hai scattato durante il viaggio direttamente alla tappa o al percorso. Ogni foto contribuisce a raccontare la tua esperienza, arricchendo il diario visivo del tuo itinerario. Le immagini sono organizzate in gallerie per una navigazione semplice e piacevole."
            img="/features/img-esempio.svg"
            reverse={true}
          />
          <GridSection 
            title="📈 Statistiche dettagliate del viaggio"
            description="Ogni traccia GPX caricata genera automaticamente statistiche come velocità media, distanza totale, tempo di percorrenza e dislivello. I dati sono presentati in modo chiaro per aiutarti ad analizzare le tue performance o semplicemente per ricordare i numeri del tuo viaggio."
            img="/features/img-esempio.svg"
            reverse={false}
          />
          <GridSection 
            title="🗺️ Mappa interattiva dei luoghi visitati"
            description="Visualizza su una mappa tutti i luoghi in cui sei stato: ogni viaggio aggiunge automaticamente punti o percorsi alla tua mappa personale. Puoi così vedere crescere nel tempo la tua collezione di mete, creando una vera e propria cartografia delle tue esperienze."
            img="/features/img-esempio.svg"
            reverse={true}
          />
          <GridSection 
            title="📌 Pianifica i viaggi futuri con Google My Maps"
            description="Puoi incorporare direttamente nel sito le mappe personalizzate create su Google My Maps tramite iframe. Perfetto per tenere traccia di viaggi in programma, luoghi da visitare, tappe imperdibili e percorsi alternativi. È uno strumento utile sia per la pianificazione personale che per condividere suggerimenti con altri viaggiatori."
            img="/features/img-esempio.svg"
            reverse={false}
          />
        </div>
      </div>
    </>
  );
}

export default Homepage;
