public class Result<A>
{
    public bool IsSuccess { get; set; }

    public A? Value { get; set; }

    public string? Error { get; set; }
    
    public static Result<A> Success(A value) => new Result<A> { IsSuccess = true, Value = value };

    public static Result<A> Failure(string error) => new Result<A> { IsSuccess = false, Error = error };
}