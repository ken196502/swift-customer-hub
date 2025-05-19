import { format } from 'date-fns';

/**
 * 格式化日期为“25-10-10\n hh:mm”格式
 * @param date 输入可以被 new Date 解析的值
 */
export function formatSubmitTime(date: string | number | Date) {
  if (!date) return '';
  try {
    return format(new Date(date), "yy-MM-dd'\n' HH:mm");
  } catch {
    return String(date);
  }
}
