function Avatar({ name }: { name: string }) {
  return (
    <div className="bg-primary-container h-10 w-10 rounded-[8px] px-1.75 py-2 text-center text-white">
      <p className="text-[16px] font-bold">{name}</p>
    </div>
  );
}

export default Avatar;
