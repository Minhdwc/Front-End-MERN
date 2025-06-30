import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

type ModalType = "success" | "warning" | "error" | "info";

const iconMap: Record<ModalType, React.ReactNode> = {
  success: <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />,
  warning: <WarningAmberIcon color="warning" sx={{ fontSize: 48 }} />,
  error: <ErrorIcon color="error" sx={{ fontSize: 48 }} />,
  info: <InfoIcon color="info" sx={{ fontSize: 48 }} />,
};

interface CustomModalProps {
  open: boolean;
  type?: ModalType;
  title?: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  type = "info",
  title,
  text,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  showCancel = true,
  showConfirm = true,
  onConfirm,
  onCancel,
}: CustomModalProps) => {
  const icon = iconMap[type as ModalType];
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <Box display="flex" flexDirection="column" alignItems="center" pt={3}>
        {icon}
      </Box>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        {title ||
          (type === "success"
            ? "Thành công"
            : type === "warning"
            ? "Cảnh báo"
            : type === "error"
            ? "Lỗi"
            : "Thông báo")}
      </DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        {showCancel && (
          <Button onClick={onCancel} variant="outlined" color="inherit">
            {cancelText}
          </Button>
        )}
        {showConfirm && (
          <Button
            onClick={onConfirm}
            variant="contained"
            color={
              type === "error"
                ? "error"
                : type === "warning"
                ? "warning"
                : type === "success"
                ? "success"
                : "primary"
            }
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
