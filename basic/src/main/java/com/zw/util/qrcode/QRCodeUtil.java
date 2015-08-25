package com.zw.util.qrcode;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;

/**
 * 使用google ZXing生成二维码的工具类
 * 
 * @author JunXiong_Xu 2015-07-15
 */
public class QRCodeUtil {

	private static final int BLACK = 0xFF000000;
	private static final int WHITE = 0xFFFFFFFF;

	/**
	 * 生成二维码
	 * 
	 * @param content
	 *            二维码内容
	 * @param charset
	 *            编码二维码内容时采用的字符集(传null时默认采用UTF-8编码)
	 * @param imagePath
	 *            二维码图片存放路径(含文件名)
	 * @param width
	 *            生成的二维码图片宽度
	 * @param height
	 *            生成的二维码图片高度
	 * @param logoPath
	 *            logo头像存放路径(含文件名,若不加logo则传null即可)
	 * @return 生成二维码结果(true or false)
	 * @throws WriterException
	 * @throws UnsupportedEncodingException
	 */
	private static BitMatrix encodeQRCodeImage(String content, String charset,
			String imagePath, int width, int height, String logoPath)
			throws Exception {

		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		// 指定编码格式
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		// 指定纠错级别(L--7%,M--15%,Q--25%,H--30%)
		//hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		//hints.put(EncodeHintType.MARGIN, 0);
		// 编码内容,编码类型(这里指定为二维码),生成图片宽度,生成图片高度,设置参数
		BitMatrix bitMatrix = new MultiFormatWriter().encode(
				new String(content
						.getBytes(charset == null ? "UTF-8" : charset),
						"UTF-8"), BarcodeFormat.QR_CODE, width, height,
				hints);
		return bitMatrix;
	}

	public static BufferedImage toBufferedImage(BitMatrix matrix) {
		int width = matrix.getWidth();
		int height = matrix.getHeight();
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				image.setRGB(x, y, matrix.get(x, y) ? BLACK : WHITE);
			}
		}
		return image;
	}

	public static void writeToStream(String content, OutputStream stream)
			throws Exception {
		BitMatrix bitMatrix = encodeQRCodeImage(content, null, null, 200, 200,
				null);
		BufferedImage image = toBufferedImage(bitMatrix);
		if (!ImageIO.write(image, "jpg", stream)) {
			throw new IOException("Could not write an image of format " + "jpg");
		}

	}

	public void writeToStream(BitMatrix matrix, String format,
			OutputStream stream) throws IOException {
		BufferedImage image = toBufferedImage(matrix);
		if (!ImageIO.write(image, format, stream)) {
			throw new IOException("Could not write an image of format "
					+ format);
		}
	}
}
