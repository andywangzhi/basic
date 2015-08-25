package com.zw.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.google.common.base.Strings;


/**
 * 日期工具
 * 
 * @author xu_junxiong
 * 
 */
public class DateUtil {

	public static final String FORMAT_DATE = "yyyyMMdd";

	private static final String FORMAT_TIME = "HHmmss";

	public static final String FORMAT_YEAR_MONTH = "yyyyMM";
	public static final String FORMAT_YEAR_MONTH2 = "yyyy-MM";

	private static final long MILLIS_PER_DAY = 24 * 60 * 60 * 1000;
	/**
	 * 多余的时间，减少8个小时
	 */
	private static final long MILLIS_FIRST_TIME = 8 * 60 * 60 * 1000;

	/** 中文的年月格式yyyy年MM月 */
	public static final String CHINA_FORMAT_YEAR_MONTH = "yyyy年MM月";

	/** 中文的年月格式yyyy年MM月dd日 */
	public static final String CHINA_FORMAT_YEAR_MONTH_DAY = "yyyy年MM月dd日";
	
	private static final String CHINA_FORMAT_MONTH_DAY = "M月dd日";

	public static final String FORMAT_DATE_SHORT = "yyyy-MM-dd";
	
	public static final String FORMAT_DATE_SLASH_SHORT = "yyyy/MM/dd";
	
	public static final String FORMAT_DATE_SLASH_SHORT_ = "MM/dd/yyyy";

	public static final String FORMAT_DATETIME = "yyyy-MM-dd HH:mm:ss";
	/** 日期格式yyMMdd */
	public static final String FORMAT_DATE_SIMPLE = "yyMMdd";

	/** 日期格式HH */
	public static final String FORMAT_DATE_HOUR = "HH";

	public static final String FORMAT_DATE_TIME = "yyyyMMddHHmmss";

	public static final String FORMAT_DATETIME_NOT_S = "yyyy-MM-dd HH:mm";
	
	public static final String FORMAT_DATETIME_NOT_SS = "yyyy/MM/dd HH:mm";
	
	/** 中文的年月格式yyyy年MM月dd日 HH时*/
	private static final String CHINA_FORMAT_YEAR_MONTH_DAY_HOUR = "yyyy年MM月dd日 HH时";
	
	public static final String MAX_HOUR_MIN_SECOND = " 23:59:59";
	
	public static final String FORMAT_DATE_MILLS = "yyyyMMddHHmmssSSS";
	
	public static final String FORMAT_DATE_MILLS2 = "HHmmssSSSSSS";
	
	public static final String FORMAT_DATE_MILLS3 = "yyyyMMddHHmmss";

	/**两位年份格式*/
	public static final String FORMAT_YY = "yy";
	/**
	 * 判断当期时间是否在指定时间之内
	 * 
	 * @param time1
	 *            yyyymmddhh24miss
	 * @param time2
	 *            yyyymmddhh24miss
	 * @return
	 */
	public static boolean isNowIn(long time1, long time2) {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		long now = Long.parseLong(format.format(new Date()));
		return time1 <= now && now <= time2;
	}

	/**
	 * 格式化日期
	 * 
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(Date date, String pattern) {
		DateFormat format = new SimpleDateFormat(pattern);
		return format.format(date);
	}
	
	/**
	 * 格式化日期 
	 * @param intDate 201305
	 * @param pattern
	 * @return
	 * @throws ParseException
	 * @author CNVISD61  
	 * @date 2013-7-17
	 */
	public static String format(String intDate, String pattern) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat(FORMAT_YEAR_MONTH);
		Date newDate = format.parse(intDate);
		return format(newDate, pattern);
	}
	
	

	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static Integer getNowDate() {
		return new Integer(format(new Date(), FORMAT_DATE));
	}
	
	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static Long getNowTimeInMills() {
		return new Long(format(new Date(), FORMAT_DATE_MILLS));
	}
	
	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static Long getNowTimeInMills2() {
		return new Long(format(new Date(), FORMAT_DATE_MILLS2));
	}
	
	
	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static Long getNowTimeInMills3() {
		return new Long(format(new Date(), FORMAT_DATE_MILLS3));
	}

	/**
	 * 获取当前日期
	 * 
	 * @return String
	 */
	public static String getCurrentDate() {
		return format(new Date(), FORMAT_DATE_SHORT);
	}

	/**
	 * 获取当前时间
	 * 
	 * @return String
	 */
	public static String getCurrentDateTime() {
		return format(new Date(), FORMAT_DATETIME);
	}

	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static Integer getNowTime() {
		return new Integer(format(new Date(), FORMAT_TIME));
	}

	/**
	 * 将字符串解析成Date类型
	 * 
	 * @param s
	 * @param format
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String s, String format) throws ParseException {
		
		if(Strings.isNullOrEmpty(s)){
			return null;
		}
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		int len = format.length() - s.length();
		for (int i = 0; i < len; i++) {
			s = "0" + s;
		}
		
		return formatter.parse(s);
	}

	/**
	 * 将字符串解析成Calendar类型
	 * 
	 * @param dateStr
	 * @return Calendar
	 * @throws ParseException
	 */
	public static Calendar parseString(String dateStr) throws ParseException {
		return parseString(dateStr, FORMAT_DATETIME);
	}

	/**
	 * 将字符串解析成Calendar类型
	 * 
	 * @param dateStr
	 * @param pattern
	 * @return
	 * @throws ParseException
	 */
	public static Calendar parseString(String dateStr, String pattern)
			throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		Date date = sdf.parse(dateStr);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}

	/**
	 * 转换日历为时间hhmmss格式
	 * 
	 * @param cal
	 * @return
	 */
	public static String Calendar2Time6(Calendar cal) {
		String time = "";
		if (cal != null) {
			String timeAll = cal.getTime().toString();
			time = timeAll.substring(11, 13) + timeAll.substring(14, 16)
					+ timeAll.substring(17, 19);
		}
		return time;
	}

	/**
	 * 转换日历为yyyymmdd格式
	 * 
	 * @param cal
	 * @return
	 */
	public static Long Calendar2LongDate(Calendar cal) {
		Long longDate = null;

		if (cal != null) {
			longDate = new Long(cal.get(Calendar.YEAR) * 10000L
					+ (cal.get(Calendar.MONTH) + 1) * 100L
					+ cal.get(Calendar.DATE));
		}

		return longDate;
	}

	/**
	 * 转换日历为yyyymm格式
	 * 
	 * @param cal
	 * @return
	 */
	public static Long Calendar2LongMonth(Calendar cal) {
		Long longDate = null;

		if (cal != null) {
			longDate = new Long(cal.get(Calendar.YEAR) * 100L
					+ cal.get(Calendar.MONTH) + 1);
		}

		return longDate;
	}

	/**
	 * 得到应用服务器当前日期
	 * 
	 * @return
	 */
	public static java.sql.Date getAppServerDate() {
		return new java.sql.Date(System.currentTimeMillis());
	}

	/**
	 * 将String型日期2008-01-28 或 2012年07月06日 转为Integer型日期20080128
	 * 
	 * @param strDate
	 * @return
	 * @author baolibing
	 */
	public static Integer formatDateSrt2Int(String strDate) {
		Integer intDate = null;
		if (!StringUtils.isBlank(strDate)) {
			intDate = new Integer(strDate.replaceAll("-", "").replaceAll(
					"[\\u4E00-\\u9FA5]", ""));
		}
		return intDate;
	}

	/**
	 * 取得某日期之后或之前n月的日期
	 * 
	 * @param date
	 * @param months
	 *            正－之后，负－之前 取得2006-01-01后三月的日期,返回2006-04-01 Date afterDate =
	 *            addMonth(new Date(2006-01-01),3);
	 *            取得2006-01-01之前三月的日期,返回2005-10-01 Date beforeDate =
	 *            addMonth(new Date(2006-01-01),-3);
	 * @return
	 */
	public static java.sql.Date addMonth(Date date, int months) {
		GregorianCalendar calendar = new GregorianCalendar();
		calendar.clear();
		DateFormat format = new SimpleDateFormat("yyyy");
		int year = Integer.valueOf(format.format(date)).intValue();
		format = new SimpleDateFormat("MM");
		int month = Integer.valueOf(format.format(date)).intValue() - 1;
		format = new SimpleDateFormat("dd");
		int date_of_month = Integer.valueOf(format.format(date)).intValue();
		calendar.set(year, month, date_of_month);
		calendar.add(GregorianCalendar.MONTH, months);
		return new java.sql.Date(calendar.getTime().getTime());
	}

	/**
	 * 取得某日期之后或之前n天的日期
	 * 
	 * @param date
	 * @param days
	 *            正－之后，负－之前 取得2006-01-01后三天的日期,返回2006-01-04 Date afterDate =
	 *            addDate(new Date(2006-01-01),3);
	 *            取得2006-01-01之前三天的日期,返回2005-12-29 Date beforeDate = addDate(new
	 *            Date(2006-01-01),-3);
	 * @return
	 */
	public static Date addDate(Date date, int days) {
		long time = date.getTime() + (MILLIS_PER_DAY * days);
		return new Date(time);
	}

	public static String showTime(java.util.Date date, String pattern) {
		if (date == null || pattern == null) {
			return null;
		}
		DateFormat df = new SimpleDateFormat(pattern);
		return df.format(date);

	}

	/**
	 * 转换日历,格式为yyyy年MM月
	 * 
	 * @param date
	 * @return String
	 */
	public static String date2ChineseMonth(Date date) {
		return format(date, CHINA_FORMAT_YEAR_MONTH);
	}

	/**
	 * 转换日历,格式为yyyyMM
	 * 
	 * @param date
	 * @return String
	 */
	public static String date2Month(Date date) {
		return format(date, FORMAT_YEAR_MONTH);
	}

	/**
	 * 将中文日历格式为yyyy年mm月转换成数字日期
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String chineseMonth2Date(String date) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(CHINA_FORMAT_YEAR_MONTH);
		Date newDate = format.parse(date);
		return format(newDate, FORMAT_YEAR_MONTH);
	}

	/**
	 * 将中文的年月格式yyyy年MM月dd日转换成yyyy-MM-dd
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String chineseDate2ShortDate(String date) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(
				CHINA_FORMAT_YEAR_MONTH_DAY);
		Date newDate = format.parse(date);
		return format(newDate, FORMAT_DATE_SHORT);
	}
	
	/**
	 * 将中文的年月格式yyyy年MM月dd日转换成
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String chineseDate2DigitalDate(String date) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(
				CHINA_FORMAT_YEAR_MONTH_DAY);
		Date newDate = format.parse(date);
		return format(newDate, FORMAT_DATE);
	}

	/**
	 * 将数字日期转换成中文的年月格式yyyy年MM月dd日
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String digitalDate2ChineseDate(String date) throws Exception {
		if (StringUtils.isBlank(date)) {
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat(FORMAT_DATE);
		Date newDate = format.parse(date);
		return format(newDate, CHINA_FORMAT_YEAR_MONTH_DAY);
	}

	/**
	 * 将数字yyyyMMddHHmmss日期转换成中文的年月格式yyyy年MM月dd日
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String longDigitalDate2ChineseDate(String date)
			throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(FORMAT_DATE_TIME);
		Date newDate = format.parse(date);
		return format(newDate, CHINA_FORMAT_YEAR_MONTH_DAY);
	}

	/**
	 * 将日期转换成中文的年月格式yyyy年MM月dd日
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String date2ChineseDate(String date, String dateFormat)
			throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(dateFormat);
		Date newDate = format.parse(date);
		return format(newDate, CHINA_FORMAT_YEAR_MONTH_DAY);
	}

	/**
	 * 将日期（字符串）由一种格式类型转换成另一种格式类型
	 * @param date
	 * @param dateFormat
	 * @return
	 * @throws Exception
	 */
	public static String format(String date, String srcFormat, String desFormat)
			throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(srcFormat);
		Date newDate = format.parse(date);
		return format(newDate, desFormat);
	}
	
	/**
	 * 将传入的日期date增加或减少months个月，并返回增加或减少月份后的日期。当months为正数，即表示增加月份，当months为负数，
	 * 即表示减少月份
	 * 
	 * @param date
	 * @param months
	 * @return Date
	 */
	public static Date getAddMonth(Date date, int months) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, months);
		return cal.getTime();
	}

	/**
	 * 获取月份 1-12
	 * 
	 * @return 月份
	 */
	public static int getMonth() {
		Calendar cal = Calendar.getInstance();
		long timeInMillis = cal.getTimeInMillis();
		long time = (timeInMillis + MILLIS_FIRST_TIME) % MILLIS_PER_DAY;
		if (time != 0) {
			cal.setTimeInMillis(timeInMillis - time);
		}
		return cal.get(Calendar.MONTH) + 1;
	}

	/**
	 * 将Interger日期型转成Date型
	 * 
	 * @param nDate
	 *            Integer型日期
	 * @return Date型日期
	 */
	public static Date int2Date(Integer nDate) {
		return str2Date(String.valueOf(nDate));
	}

	/**
	 * 将字符串型日期转成日期型，例如：20060202 注意会生成时分秒
	 * 
	 * @param strDate
	 *            指定字符串型日期
	 * @return 日期型
	 */
	public static Date str2Date(String strDate) {
		Calendar c = Calendar.getInstance();
		if (strDate.length() != 8) {
			return null;
		}
		int year = Integer.parseInt(strDate.substring(0, 4));
		int month = Integer.parseInt(strDate.substring(4, 6)) - 1;
		int date = Integer.parseInt(strDate.substring(6));
		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month);
		c.set(Calendar.DATE, date);
		return new Date(c.getTimeInMillis());
	}


	/**
	 * 获取两个日期的月份之差，即相差几个月
	 * 
	 * @param date1
	 * @param date2
	 * @return
	 * @throws Exception
	 */
	public static int getMonthsOfAge(Integer date1, Integer date2)
			throws Exception {

		Calendar calendar2 = Calendar.getInstance();
		calendar2.setTime(int2Date(date2));
		Calendar calendar1 = Calendar.getInstance();
		calendar1.setTime(int2Date(date1));
		int num = (calendar1.get(Calendar.YEAR) - calendar2.get(Calendar.YEAR))
				* 12 + calendar1.get(Calendar.MONTH)
				- calendar2.get(Calendar.MONTH);
		return num;
	}
	
	/**
	 * 获取两个日期的月份之差，即相差几个月
	 * 
	 * @param date1 20140801
	 * @param date2 20130801
	 * @return
	 * @throws Exception
	 */
	public static int getMonthsOfAge(String date1, String date2)
			throws Exception {

		Calendar calendar2 = Calendar.getInstance();
		calendar2.setTime(str2Date(date2));
		Calendar calendar1 = Calendar.getInstance();
		calendar1.setTime(str2Date(date1));
		int num = (calendar1.get(Calendar.YEAR) - calendar2.get(Calendar.YEAR))
				* 12 + calendar1.get(Calendar.MONTH)
				- calendar2.get(Calendar.MONTH);
		return num;
	}

	/**
	 * 得到两个日期间隔天数
	 * 
	 * @param date1
	 *            较大的日期
	 * @param date2
	 *            较小的日期
	 * @return
	 */
	public static int getDaysOfAge(Integer date1, Integer date2) {
		long day = (int2Date(date1).getTime() - int2Date(date2).getTime()) / (86400000);
		return (int) day;
	}

	/**
	 * 从传入的月份(yyyyMM)，得到当月1号和当月最后一天的日期(yyyyMMdd)
	 * 
	 * @param month
	 * @return Integer[]
	 */
	public static Integer[] getBeginEndDates(Integer month) throws Exception {
		Date date = parse(String.valueOf(month.intValue()), FORMAT_YEAR_MONTH);
		// 获取当月1号
		Integer beginDate = new Integer(format(date, FORMAT_DATE));
		// 获取当月最后一天
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
		Integer endDate = new Integer(format(calendar.getTime(), FORMAT_DATE));
		return new Integer[] { beginDate, endDate };
	}

	/**
	 * 将日期转成Integer型,例如日期为2006-07-24,返回20060724
	 * 
	 * @param date
	 *            指定日期
	 * @return Integer型日期
	 */
	public static Integer date2Int(Date date) {
		DateFormat format = new SimpleDateFormat(FORMAT_DATE);
		String str = format.format(date);
		return Integer.valueOf(str);
	}

	/**
	 * 获取当天是当月的几号
	 * 
	 * @return int
	 */
	public static int getDayOfMonth() {
		return Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取当月最后一天
	 * 
	 * @return int
	 */
	public static int getLastDayOfMonth() {
		return Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取当前时间是几点钟
	 * 
	 * @return int
	 */
	public static int getHour() {
		return new Integer(format(new Date(), FORMAT_DATE_HOUR)).intValue();
	}

	/**
	 * 获取当前时间的N分钟之前或之后的时间 minute为正数则返回当前时间之后的时间 minute为负数则返回当前时间之前的时间
	 * 
	 * @param minute
	 * @return Long 毫秒数
	 */
	public static Long getAddTiem(int minute) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, minute);
		return new Long(cal.getTimeInMillis());
	}

	/**
	 * 获取当前时间的N分钟之前或之后的时间 minute为正数则返回当前时间之后的时间 minute为负数则返回当前时间之前的时间
	 * 
	 * @param minute
	 * @return Long 毫秒数
	 */
	public static String getAddTiemStr(int minute) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, minute);
		return format(cal.getTime(), FORMAT_DATE_TIME);
	}

	/**
	 * 将时间戳转成Integer型日期
	 * 
	 * @param ts
	 *            指定时间戳
	 * @return Integer型日期
	 */
	public static Integer date2Int(Timestamp ts) {
		DateFormat format = new SimpleDateFormat(FORMAT_DATE);
		String str = format.format(ts);
		return Integer.valueOf(str);
	}

	/**
	 * 将时间戳转成Integer型时间
	 * 
	 * @param ts
	 *            指定时间戳
	 * @return Integer型时间
	 */
	public static Integer time2Int(Timestamp ts) {
		DateFormat format = new SimpleDateFormat(FORMAT_TIME);
		String str = format.format(ts);
		return Integer.valueOf(str);
	}

	/**
	 * 将字符串型时间转成时间戳，日期默认为系统日期
	 * 
	 * @param strTime
	 *            字符串型时间
	 * @return 时间戳型
	 */
	private static Timestamp str2Time1(String strTime) {
		Calendar c = Calendar.getInstance();

		if (strTime.length() < 6) {
			String prefix = "";
			for (int i = 0; i < 6 - strTime.length(); i++) {
				prefix += "0";
			}
			strTime = prefix + strTime;
		}
		if (strTime.length() > 6) {
			return null;
		}
		int hour = Integer.parseInt(strTime.substring(0, 2));
		int minute = Integer.parseInt(strTime.substring(2, 4));
		int second = Integer.parseInt(strTime.substring(4));

		c.set(Calendar.HOUR_OF_DAY, hour);
		c.set(Calendar.MINUTE, minute);
		c.set(Calendar.SECOND, second);
		c.set(Calendar.MILLISECOND, 0);

		return new Timestamp(c.getTimeInMillis());
	}

	/**
	 * 将字符串型转换成Timestamp型 例如：20060820142010
	 * 
	 * @param strTime
	 *            字符串型时间戳
	 * @return 时间戳型
	 */
	private static Timestamp str2Time2(String strTime) {
		Calendar c = Calendar.getInstance();

		int year = Integer.parseInt(strTime.substring(0, 4));
		int month = Integer.parseInt(strTime.substring(4, 6));
		int day = Integer.parseInt(strTime.substring(6, 8));
		int hour = Integer.parseInt(strTime.substring(8, 10));
		int minute = Integer.parseInt(strTime.substring(10, 12));
		int second = Integer.parseInt(strTime.substring(12));

		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.DAY_OF_MONTH, day);

		c.set(Calendar.HOUR_OF_DAY, hour);
		c.set(Calendar.MINUTE, minute);
		c.set(Calendar.SECOND, second);
		c.set(Calendar.MILLISECOND, 0);
		return new Timestamp(c.getTimeInMillis());
	}

	/**
	 * 将字符串型时间或时间戳转成时间戳类型
	 * 
	 * @param strTime
	 *            字符串型时间或时间戳
	 * @return 时间戳类型
	 */
	public static Timestamp str2Time(String strTime) {
		if (strTime.length() <= 6) {
			return str2Time1(strTime);
		}
		return str2Time2(strTime);
	}

	/**
	 * 将指定的时间的毫秒值转换成Calendar
	 * 
	 * @param millis
	 *            指定的时间的毫秒值
	 * @return Calendar型时间
	 */
	public static Calendar millisToCalendar(long millis) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(millis);
		return cal;
	}

	/**
	 * 返回当前时间的毫秒值
	 * 
	 * @return 时间的毫秒值
	 * */
	public static long getNowTimeInMillis() {
		Calendar cal = Calendar.getInstance();
		return cal.getTimeInMillis();
	}

	public static Long formatTimeInMillis(long timeInMillis) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(timeInMillis);
		return new Long(format(cal.getTime(), FORMAT_DATE_TIME));
	}

	public static Integer formatDate(long timeInMillis) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(timeInMillis);
		return new Integer(format(cal.getTime(), FORMAT_DATE));
	}

	public static Integer formatTime(long timeInMillis) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(timeInMillis);
		return new Integer(format(cal.getTime(), FORMAT_TIME));
	}

	public static Calendar formatCalendar(long timeInMillis) {
		Calendar cal = Calendar.getInstance();
		cal.setTimeInMillis(timeInMillis);
		return cal;
	}

	public static Long StringToTimeInMillis(String dateStr, String format)
			throws ParseException {
		Date date = parse(dateStr, format);
		return new Long(date.getTime());
	}

	public static void main(String[] args) {
		try {
//			System.out.println(digitalDate2ChineseDate(new Integer(0)));
			Date d1 = new Date();
			String tradeTime = String.valueOf(DateUtil
					.formatTimeInMillis(DateUtil.getNowTimeInMillis()));
			String tradeTime1 = String.valueOf(DateUtil
					.formatTimeInMillis(new Date().getTime()));
			System.out.println(tradeTime+"---"+tradeTime1);
			Calendar cal1 = Calendar.getInstance();
			cal1.setTime(d1);
			System.out.println(cal1.getTimeInMillis());
			Calendar cc=DateUtil.getCalendar("2014-07-31");
			System.out.println(cc+"---");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 将数字日期转换成中文的年月格式yyyy年MM月dd日
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String digitalDate2ChineseDate(Integer date) throws Exception {
		if(date == null){
			return "";
		}
		SimpleDateFormat format = new SimpleDateFormat(FORMAT_DATE);
		Date newDate = format.parse(date.toString());
		return format(newDate, CHINA_FORMAT_YEAR_MONTH_DAY);
	}
	
	/**
	 * 将数字yyyyMMddHHmmss日期转换成yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public static String longDigitalDateFormat(String date)
			throws Exception {
		SimpleDateFormat format = new SimpleDateFormat(FORMAT_DATE_TIME);
		Date newDate = format.parse(date);
		return format(newDate, FORMAT_DATETIME);
	}
	
	/***
	 * 年月格式化
	 * 
	 * @param curYearMonth
	 * @return
	 */
	public static String formatYearMonth(String curYearMonth) {
		String year = "";
		String month = "";
		try {
			year = curYearMonth.substring(0, 4);
			month = curYearMonth.substring(4, 6);
		} catch (Exception e) {
			return curYearMonth;
		}
		return year + "年" + month + "月";
	}
	
	/**
	 * 添加小时
	 * @param hour
	 * @return
	 * @author CNVISD61  
	 * @date 2014-3-12
	 */
	public static Date addHour(int hour){
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.HOUR, hour);
		return cal.getTime();
	}

	/**
	 * 返回当天最小的日期时间(如2014-07-01 00:00:00)
	 * @param dateStr
	 * 			当天日期
	 * @return
	 * @throws Exception
	 * @author huangbo
	 */
	public static Date getMinOfDay(String dateStr) throws Exception{
		return DateUtil.parse(dateStr, DateUtil.FORMAT_DATE_SHORT);
	}
	
	/**
	 * 返回当天最大的日期时间(如2014-07-01 23:59:59)
	 * @param dateStr
	 * 			当天日期
	 * @return
	 * @throws Exception
	 * @author huangbo
	 */
	public static Date getMaxOfDay(String dateStr) throws Exception {
		return DateUtil.parse(
				DateUtil.format(
						DateUtil.parse(dateStr, DateUtil.FORMAT_DATE_SHORT),
						DateUtil.FORMAT_DATE_SHORT)
						+ DateUtil.MAX_HOUR_MIN_SECOND,
				DateUtil.FORMAT_DATETIME);
	}
	
	/**
	 * 校验操作时间是否在可操作的时间范围内. 
	 * 注意时间的比较采用before,after,这两方法依赖于UTC时间,可能因为时区导致时间不准确.
	 * @author huangbo
	 */
	public static boolean isRegionTime(Calendar startTime, Calendar endTime,
			Calendar optionTime) {

		if (startTime == null || endTime == null || optionTime == null) {
			return false;
		}
		long start = startTime.getTimeInMillis();
		long end = endTime.getTimeInMillis();
		long time = optionTime.getTimeInMillis();
		return start <= time && time <= end;
		
	}
	public static boolean isDuringGivenPeriod(Date start,Date end,Date given){
		
		if(start.before(given)&&end.after(given)){
			return true;
		}
		else{
			return false;
		}
		
	}
	
	/**
	 * 获取指定的月份跨了几周
	 * @return
	 * 		返回一个月所跨的周数
	 * @author huangbo
	 */
	public static int getWeekStepsOfMonth(Date date) {

		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		c2.set(Calendar.DATE, 1);

		int starDayOfWeek = c2.get(Calendar.DAY_OF_WEEK);
		c2.roll(Calendar.DATE, -1);

		int endDayOfWeek = c2.get(Calendar.DAY_OF_WEEK);
		int daysOfMonth = getMonthLastDay(c2.get(Calendar.YEAR),
				c2.get(Calendar.MONTH) + 1);

		int s = 0, e = 0;
		if (starDayOfWeek != Calendar.MONDAY) {
			s = (starDayOfWeek == Calendar.SUNDAY) ? 1
					: (7 - (starDayOfWeek - 1) + 1);
		}
		if (endDayOfWeek != Calendar.SUNDAY) {
			e = endDayOfWeek - 1;
		}

		return ((daysOfMonth - s - e) / 7) + (s != 0 ? 1 : 0)
				+ (e != 0 ? 1 : 0);

	}
	
	/**
	 * 获得同一个月一段时间范围跨了几周
	 * @author huangbo
	 */
	public static int getWeekStepsOfMonth(Calendar cal1,Calendar cal2) {
		int starDayOfWeek = cal1.get(Calendar.DAY_OF_WEEK);
		int endDayOfWeek = cal2.get(Calendar.DAY_OF_WEEK);
		
//		int daysOfMonth = getMonthLastDay(cal1.get(Calendar.YEAR),
//				cal1.get(Calendar.MONTH) + 1);
		cal1.set(Calendar.DATE, 1);
		int daysOfMonth = cal2.get(Calendar.DATE ) - cal1.get(Calendar.DATE) + 1;

		int s = 0, e = 0;
		if (starDayOfWeek != Calendar.MONDAY) {
			s = (starDayOfWeek == Calendar.SUNDAY) ? 1
					: (7 - (starDayOfWeek - 1) + 1);
		}
		if (endDayOfWeek != Calendar.SUNDAY) {
			e = endDayOfWeek - 1;
		}

		return ((daysOfMonth - s - e) / 7) + (s != 0 ? 1 : 0)
				+ (e != 0 ? 1 : 0);
	}
	
	/**
	 * 获取指定的月份跨了几周
	 * @param dateStr
	 * 			指定的年月,或者具体日期(yyyy-MM,yyyy-MM-dd)
	 * @return
	 * @throws ParseException
	 * @author huangbo
	 */
	public static int getWeekStepsOfMonth(String dateStr) throws ParseException {
		
		if(StringUtils.isBlank(dateStr)){
			return 0;
		}
		Date date = null;
		if(dateStr.length() == FORMAT_YEAR_MONTH2.length()){
			date = parse(dateStr, FORMAT_YEAR_MONTH2);
		}else if(dateStr.length() == FORMAT_DATE_SHORT.length()){
			date = parse(dateStr, FORMAT_DATE_SHORT);
		}
		return getWeekStepsOfMonth(date);
	}

	/**
	 * 获取指定日期所在的月,该月总共有多少天.<br>
	 * 如若获取当月的见{@link #getLastDayOfMonth}
	 * @param year
	 * 			指定的年份
	 * @param month
	 * 			指定的月份
	 * @return
	 * 			返回该月份最大的天数
	 * @author huangbo
	 */
	public static int getMonthLastDay(int year, int month) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		// 把日期设置为当月第一天
		calendar.set(Calendar.DATE, 1);
		// 日期回滚一天，也就是最后一天
		calendar.roll(Calendar.DATE, -1);
		
		int maxDate = calendar.get(Calendar.DATE);
		return maxDate;
	}
	
	
	
	/**
	 * 获取指定月1号所在的周,从周一对应的日期到周日对应的日期集合,如(以201407月为例):
	 * <pre>
	 * 星期	一	二	三	四	五	六	日
	 * 	30	1	2	3	4	5	6
	 * <pre>
	 * @param date
	 * 			指定的日期
	 * @return
	 * 			具体天集合
	 * @author huangbo
	 */
	public static List getDaysFirstWeekOfMonth(Date date) {
		Calendar c2 = Calendar.getInstance();

		c2.setTime(date);
		c2.set(Calendar.DATE, 1);

		int starDayOfWeek = c2.get(Calendar.DAY_OF_WEEK);

		int preDay = 0;
		if (starDayOfWeek != Calendar.MONDAY) {
			preDay = (starDayOfWeek == Calendar.SUNDAY) ? 6
					: (starDayOfWeek - 2);
		}

		List list = new ArrayList();
		if (preDay > 0) {
			c2.add(Calendar.MONTH, -1);
			int lday = c2.getActualMaximum(Calendar.DAY_OF_MONTH);
			c2.roll(Calendar.DATE, -1);

			for (int i = preDay; i > 0; i--) {
				list.add(String.valueOf(lday - i + 1));
			}
			int temp = 7 - preDay;
			for (int i = 1; i <= temp; i++) {
				list.add(String.valueOf(i));
			}
		} else {
			for (int i = 1; i <= 7; i++) {
				list.add(String.valueOf(i));
			}
		}
		return list;
	}
	
	/**
	 * 获取指定月最后一天所在的周,从周一对应的日期到周日对应的日期集合,如(以201407月为例):
	 * <pre>
	 * 星期	一	二	三	四	五	六	日
	 * 	28	29	30	31	1	2	3
	 * <pre>
	 * @param date
	 * 			指定的日期
	 * @return
	 * 			具体天集合
	 * @author huangbo
	 */
	public static List getDaysEndWeekOfMonth(Date date) {

		Calendar c2 = Calendar.getInstance();
		c2.setTime(date);
		c2.set(Calendar.DATE, 1);
		c2.roll(Calendar.DATE, -1);

		int starDayOfWeek = c2.get(Calendar.DAY_OF_WEEK);

		int preDay = 0;
		if (starDayOfWeek == Calendar.MONDAY) {
			preDay = 0;
		} else if (starDayOfWeek == Calendar.SUNDAY) {
			preDay = -7 + 1;
		} else {
			preDay = -(starDayOfWeek - 1) + 1;
		}

		c2.add(Calendar.DATE, preDay);
		List list = new ArrayList();
		for (int i = 0; i < 7; i++) {
			list.add(String.valueOf(c2.get(Calendar.DATE)));
			c2.add(Calendar.DATE, 1);
		}
		return list;
	}
	
	/**
	 * 获取指定日期的月份
	 * @author huangbo
	 */
	public static int getMonthOfYear(Date date) {
		Calendar cal = getCalendar(date);
		return cal.get(Calendar.MONTH) + 1;
	}
	
	/**
	 * 获取指定日期的年份
	 * @author huangbo
	 */
	public static int getYear(Date date) {
		Calendar cal = getCalendar(date);
		return cal.get(Calendar.YEAR);
	}
	
	/**
	 * 获取指定时间的Calendar对象
	 * @author huangbo
	 */
	public static Calendar getCalendar(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal;
	}
	
	/**
	 * 获取指定时间的Calendar对象
	 * @author huangbo
	 * @throws ParseException 
	 */
	public static Calendar getCalendar(String date) throws ParseException {
		Calendar cal = Calendar.getInstance();
		cal.setTime(DateUtil.parse(date, DateUtil.FORMAT_DATE_SHORT));
		return cal;
	}
	
	/**
	 * 判断两个日期是否是同一天
	 * @author huangbo
	 */
	public static boolean isSameDay(Calendar cal1, Calendar cal2) {
		return DateUtil.format(cal1.getTime(), DateUtil.FORMAT_DATE_SHORT)
				.equals(DateUtil.format(cal2.getTime(),
						DateUtil.FORMAT_DATE_SHORT));
	}
	
	/**
	 * 获取yyyy-MM日期格式字符串
	 * @author huangbo
	 */
	public static String getMonthYear(Calendar calendar){
		return format(calendar.getTime(), FORMAT_YEAR_MONTH2);
	}
	
	/**
	 * 获取yyyy年MM月dd日日期格式字符串
	 * @author huangbo
	 */
	public static String getDayMonthYear(Calendar calendar){
		return format(calendar.getTime(), CHINA_FORMAT_YEAR_MONTH_DAY);
	}
	
	/**
	 * 获取财年
	 * @param date
	 * @return
	 */
	public static String getFinancialYear(Calendar calendar) throws Exception{
		int month = calendar.get(Calendar.MONTH)+1;
		int year = calendar.get(Calendar.YEAR);
		String startY =  "";
		String endY = "";
		if (month < 9){
			year -= 1;
		}
		
		startY = String.valueOf(year).substring(2);
		endY = String.valueOf(year+1).substring(2);

		return  startY + "/" + endY ;
	}
}
