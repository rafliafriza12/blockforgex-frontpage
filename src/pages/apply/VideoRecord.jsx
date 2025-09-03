import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Typography, Avatar, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectApp } from "../../store";
import { getInitials } from "../../utils/name";
import logo from "../../assets/logo-blockforgex.png";
import {
  CameraOutlined,
  ReloadOutlined,
  CloseCircleOutlined,
  VideoCameraOutlined,
  StopOutlined,
} from "@ant-design/icons";
import useIsDesktop from "../../hooks/useIsDesktop";
const { Title, Text } = Typography;
const MAX_SECONDS = 180;

export default function VideoRecord() {
  const isDesktop = useIsDesktop();
  const { fullName } = useSelector(selectApp);
  const initials = getInitials(fullName);
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [status, setStatus] = useState("init");
  const [devices, setDevices] = useState([]);
  const [deviceIdx, setDeviceIdx] = useState(0);
  const [blobURL, setBlobURL] = useState("");
  const [sec, setSec] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  const attachStream = useCallback(async () => {
    const v = videoRef.current;
    const s = streamRef.current;
    if (v && s) {
      v.srcObject = s;
      v.muted = true;
      v.playsInline = true;
      try {
        await v.play();
      } catch {}
    }
  }, []);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startStream = useCallback(
    async (deviceId) => {
      setStatus("init");
      try {
        const constraints = {
          audio: true,
          video: deviceId
            ? { deviceId: { exact: deviceId } }
            : { facingMode: "user" },
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        const track = stream.getVideoTracks()[0];
        const settings = track.getSettings();
        if (settings.width && settings.height) {
          const ratio = settings.width / settings.height;
          setAspectRatio(ratio);
        }

        const list = (await navigator.mediaDevices.enumerateDevices()).filter(
          (d) => d.kind === "videoinput"
        );
        setDevices(list);
        if (deviceId) {
          const idx = Math.max(
            0,
            list.findIndex((d) => d.deviceId === deviceId)
          );
          setDeviceIdx(idx);
        } else {
          setDeviceIdx(0);
        }

        setStatus("ready");
        setTimeout(attachStream, 0);
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    },
    [attachStream]
  );

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("error");
      return;
    }
    startStream();
    return () => {
      stopStream();
      if (blobURL) URL.revokeObjectURL(blobURL);
    };
  }, []);

  useEffect(() => {
    if (status === "ready" || status === "recording") {
      attachStream();
    }
  }, [status, attachStream]);

  const switchCamera = async () => {
    if (!devices.length) return;
    const next = (deviceIdx + 1) % devices.length;
    setDeviceIdx(next);
    stopStream();
    await startStream(devices[next].deviceId);
  };

  const startRecording = () => {
    const stream = streamRef.current;
    if (!stream) return;
    try {
      chunksRef.current = [];
      const mr = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });
      recorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setBlobURL(url);
        setStatus("preview");
        setSec(0);
      };

      mr.start(100);
      setStatus("recording");
      setSec(0);

      const iv = setInterval(() => {
        setSec((s) => {
          if (s + 1 >= MAX_SECONDS) {
            clearInterval(iv);
            stopRecording();
          }
          return s + 1;
        });
      }, 1000);
    } catch (e) {
      console.error(e);
      message.error("Cannot start recording");
    }
  };

  const stopRecording = () => {
    const mr = recorderRef.current;
    if (mr && mr.state !== "inactive") mr.stop();
  };

  const retake = async () => {
    if (blobURL) URL.revokeObjectURL(blobURL);
    setBlobURL("");
    setStatus("ready");
    setTimeout(attachStream, 0);
  };

  const submitVideo = async () => {
    navigate("/apply/video/success");
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="h-screen lg:h-dvh w-full gap-0 p-5 pt-0 lg:p-[4.2vh]">
      <div className="max-w-6xl lg:max-w-none lg:w-[70vw] mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between sticky z-[10] top-0 pt-5 lg:pt-0 bg-white">
          <img src={logo} alt="Blockforgex" className="w-[18vh]" />
          {fullName && (
            <div className="flex items-center gap-2">
              <Avatar
                size={30}
                className="text-white lg:!text-[1.6vh]"
                style={{
                  background:
                    "radial-gradient(86% 86% at 50% 14%, #837CFF 0%, #4F46E5 100%)",
                  fontWeight: 600,
                }}
              >
                {initials}
              </Avatar>
              {isDesktop && (
                <Text className="text-gray-700 lg:!text-[1.6vh]">
                  {fullName}
                </Text>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-start gap-y-2 mt-[4vh]">
          {/* Back — tetap kiri; di mobile muncul di baris atas */}
          <a
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center lg:flex-none lg:items-start justify-self-start lg:justify-self-start text-indigo-600 !text-[#4F46E5] hover:underline h-12 lg:!text-[1.8vh]"
          >
            ← Back
          </a>

          {/* Title — center; font 20px di mobile, 4xl di desktop */}
          <div className="justify-self-center text-center">
            <Title
              level={1}
              className="!text-[20px] lg:!text-[3.5vh] !leading-[1.2] !mb-1"
            >
              Share Your Story & Achievements
            </Title>
            <Text type="secondary" className="!text-sm lg:!text-[1.6vh]">
              Record a short video introduction to complete your application.
            </Text>
          </div>

          {/* spacer kanan: hanya diperlukan di desktop agar title benar2 center */}
          <div className="hidden lg:block" />
        </div>

        <div className="mt-8 lg:mt-[3vh] mx-auto rounded-2xl shadow-sm bg-black relative">
          <div
            className="overflow-hidden rounded-2xl bg-black mx-auto"
            style={{
              height: isDesktop ? "35vh" : "300px",
              width: isDesktop ? `${(35 * 16) / 9}vh` : `100%`,
            }}
          >
            {status === "error" && (
              <div className="flex flex-col items-center justify-center w-full h-full text-white px-2.5">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FB2626] mb-3 relative">
                  <VideoCameraOutlined style={{ position: "absolute" }} />
                  <StopOutlined
                    style={{
                      position: "absolute",
                      color: "white",
                      fontSize: "30px",
                    }}
                  />
                </div>
                <div className="text-lg lg:text-[2vh] font-medium">
                  Camera not Ready!!
                </div>
                <p className="text-gray-300 text-sm mt-1 text-center !text-[12px] !lg:text-[1.5vh]">
                  Please check permissions, connection, or device availability.
                </p>
                <Button
                  type="primary"
                  className="!text-[12px] !lg:text-[14px] !bg-[#4F46E5] mt-3 !px-3 !py-2 h-8"
                  onClick={() => navigate("/apply/video/help")}
                >
                  Why this happen?
                </Button>
              </div>
            )}

            {status === "init" && (
              <div className="flex flex-col items-center justify-center w-full h-full text-white">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 mb-3">
                  <CameraOutlined className="text-yellow-400 text-2xl" />
                </div>
                <div className="text-lg font-medium">
                  Initializing Camera...
                </div>
              </div>
            )}

            {(status === "ready" || status === "recording") && (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="block w-full h-full object-cover bg-black"
                />

                <div className="absolute inset-0 z-20 pointer-events-none">
                  {devices.length > 1 && (
                    <button
                      type="button"
                      onClick={switchCamera}
                      onMouseDown={(e) => e.preventDefault()}
                      className="pointer-events-auto absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center
                         focus:outline-none focus:ring-0 focus-visible:outline-none"
                      style={{
                        outline: "none",
                        WebkitTapHighlightColor: "transparent",
                      }}
                      title="Switch camera"
                    >
                      <ReloadOutlined />
                    </button>
                  )}

                  <div className="absolute left-1/2 -translate-x-1/2 bottom-3">
                    <button
                      type="button"
                      onClick={
                        status === "recording" ? stopRecording : startRecording
                      }
                      className="pointer-events-auto"
                      aria-label={
                        status === "recording"
                          ? "Stop recording"
                          : "Start recording"
                      }
                      onMouseDown={(e) => e.preventDefault()}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: 0,
                      }}
                    >
                      <span
                        className={[
                          "flex items-center justify-center transition-all duration-150",
                          status === "recording"
                            ? "w-10 h-10 rounded-full border-2 border-red-600"
                            : "w-12 h-12 rounded-full border-2 border-white",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "transition-all duration-150",
                            status === "recording"
                              ? "w-3 h-3 bg-white rounded-[3px]" // kotak kecil putih
                              : "w-3.5 h-3.5 bg-red-600 rounded-full", // lingkaran merah
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </div>

                  {status === "recording" && (
                    <div className="absolute left-3 bottom-3 text-white/90 font-medium">
                      {formatTime(sec)} / 03:00
                    </div>
                  )}
                </div>
              </div>
            )}

            {status === "preview" && (
              <video
                controls
                src={blobURL}
                className="block w-full h-full object-cover bg-black"
              />
            )}
          </div>
        </div>
        {status === "preview" && (
          <div className="mt-4 mx-auto flex items-center gap-3">
            <Button
              onClick={retake}
              className="lg:!text-[1.65vh] lg:!py-[2vh] hover:!bg-[#dedede] hover:!text-black !bg-white !font-medium"
            >
              Retake
            </Button>
            <Button
              type="primary"
              className="lg:!text-[1.65vh] lg:!py-[2vh] hover:!bg-[#453ecb]  !bg-[#4F46E5] !font-medium"
              onClick={submitVideo}
            >
              Submit
            </Button>
          </div>
        )}

        <div
          style={{ width: isDesktop ? `${(35 * 16) / 9}vh` : `100%` }}
          className={`mx-auto mt-6 lg:mt-[3vh] w-full `}
        >
          <div className="font-medium text-gray-800 lg:text-[2vh] mb-3">
            Tips:
          </div>
          <ol className="space-y-2 text-sm text-gray-700 lg:text-[1.7vh]">
            <li>• Keep your video between 1–3 minutes</li>
            <li>• Ensure good lighting and clear audio</li>
            <li>• Briefly introduce yourself and your background</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
